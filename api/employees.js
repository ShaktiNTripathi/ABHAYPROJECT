const fs = require('fs');
const path = require('path');

const projectEmployeesFile = path.join(process.cwd(), 'employees.txt');
const tempEmployeesFile = path.join('/tmp', 'employees.txt');

function fileExists(filePath) {
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    return true;
  } catch (error) {
    return false;
  }
}

function parseEmployees(text) {
  if (!text) return [];
  try {
    const parsed = JSON.parse(String(text).trim() || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function readEmployees() {
  if (fileExists(tempEmployeesFile)) {
    return parseEmployees(fs.readFileSync(tempEmployeesFile, 'utf8'));
  }
  if (fileExists(projectEmployeesFile)) {
    return parseEmployees(fs.readFileSync(projectEmployeesFile, 'utf8'));
  }
  return [];
}

function writeEmployees(employees) {
  const payload = `${JSON.stringify(employees, null, 2)}\n`;

  try {
    fs.writeFileSync(projectEmployeesFile, payload, 'utf8');
    return { target: 'project' };
  } catch (error) {
    fs.writeFileSync(tempEmployeesFile, payload, 'utf8');
    return { target: 'tmp', warning: 'Persistent file write not available in this runtime. Data is temporarily stored.' };
  }
}

function setHeaders(res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

module.exports = (req, res) => {
  setHeaders(res);

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method === 'GET') {
    const employees = readEmployees();
    res.status(200).json(employees);
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});

  const employee_name = String(body.employee_name || '').trim();
  const employee_id = String(body.employee_id || '').trim();
  const designation_name = String(body.designation_name || '').trim();
  const office_name = String(body.office_name || '').trim();

  if (!employee_name || !employee_id || !designation_name || !office_name) {
    res.status(400).json({ error: 'Required fields are missing' });
    return;
  }

  const employees = readEmployees();
  const nextId = employees.reduce((maxId, item) => {
    const current = Number(item.id) || 0;
    return current > maxId ? current : maxId;
  }, 0) + 1;

  const employee = {
    id: nextId,
    employee_name,
    employee_id,
    designation_name,
    office_name,
    division_name: String(body.division_name || '').trim(),
    section_name: String(body.section_name || '').trim(),
    cadre_title: String(body.cadre_title || '').trim(),
    mode_of_joining: String(body.mode_of_joining || '').trim(),
    category_title: String(body.category_title || '').trim(),
    date_of_birth: body.date_of_birth || null,
    updated_on: new Date().toISOString(),
    transferDetails: [],
    careerGrowth: [],
    learning: []
  };

  employees.push(employee);
  const writeMeta = writeEmployees(employees);

  res.status(201).json({ employee, writeMeta });
};
