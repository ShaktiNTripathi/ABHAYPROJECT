$(document).ready(function () {



    var hin_lang = '', lang_obj;
    var table_lang_hindi = {
        'tableLang': {
            "sProcessing": "प्रगति पे हैं ...",
            "sLengthMenu": " _MENU_ प्रविष्टियां दिखाएं ",
            "sZeroRecords": "रिकॉर्ड्स का मेल नहीं मिला",
            "sInfo": "_START_ से _END_ में से _TOTAL_ प्रविष्टियां दिखा रहे हैं",
            "sInfoEmpty": "0 में से 0 से 0 प्रविष्टियां दिखा रहे हैं",
            "sInfoFiltered": "(_MAX_ कुल प्रविष्टियों में से छठा हुआ)",
            "sInfoPostFix": "",
            "sSearch": "खोजें:",
            "sUrl": "",
            "oPaginate": {
                "sFirst": "प्रथम",
                "sPrevious": "पिछला",
                "sNext": "अगला",
                "sLast": "अंतिम"
            }
        },
        'btnExcel': 'एक्सेल',
        'btnPdf': 'पीडीएफ',
        'btnPrint': 'प्रिंट',
        'isHindi': true,
        'className': "hindi-lang"
    }
    var table_lang_eng = {
        'tableLang': '',
        'btnExcel': 'Excel',
        'btnPdf': 'PDF',
        'btnPrint': 'Print',
        'isHindi': false,
        'className': ""
    }

    $('.lang-toggle').click(function () {
        if (localStorage.getItem('hindi_lang') !== null && lang_obj.isHindi === true) {
            localStorage.setItem('hindi_lang', JSON.stringify(table_lang_eng));
        }
        else {
            localStorage.setItem('hindi_lang', JSON.stringify(table_lang_hindi));
        }
        // window.location.reload(); 
    });

    lang_obj = JSON.parse(localStorage.getItem('hindi_lang')) || '';
    hin_lang = lang_obj.tableLang;

    function btnTextHandler() {
        lang_obj.className && $('.data-table-main .dt-buttons').toggleClass(lang_obj.className);
        $('.buttons-excel span').text(lang_obj.btnExcel);
        $('.buttons-pdf span').text(lang_obj.btnPdf);
        $('.buttons-print span').text(lang_obj.btnPrint);
    }



    var match_word, table_len = $("table").length, _table = $('[class^="data-table"');
    var words_arr = ["action", "select", "ref. document", "reference document", "ref document", "select all", "all"];
    for (let i = 0; i < table_len; i++) {
        _table.eq(i).find("tr th").each(function (i, elem) {
            match_word = $(elem).text().trim().toLowerCase();
            if (words_arr.indexOf(match_word) !== -1) {
                $(this).removeClass("sorting").addClass("no-sort");
            }
            else {
                $(this).addClass("included_column");
            }
        });
    }

    $('.sidebar-menu a').filter(function () {
        var loc = window.location.pathname.split('/');
        let url = window.location.origin;
        let id = '';
        let name = '';
        for (let index = 0; index < loc.length; index++) {
            if (index > 0) {
                url = url + '/' + loc[index];
                id = $("[href='" + url + "']").data('process-id');
                name = $("[href='" + url + "']").data('process-name');
                document.title = name != undefined ? name : 'FCI HRMS';
                if (id != undefined) {
                    selectMenuByProcessId(id);
                }
            }
        }
        // window.location.origin
        if ($(this).attr('href') == window.location) {
            $(this).parent('li').addClass('active');
            $(this).parents('.treeview-menu').addClass('menu-open');
            $(this).parents('li').addClass('active');
        }
    })

    $('#logout').click(function () {
        sessionStorage.clear();
    })

    // code for making select2  work in bootstrap  modal
    $.fn.modal.Constructor.prototype.enforceFocus = function () { };

    // for nested modal fix
    $(document).on("hidden.bs.modal", ".nested-modal", function (e) {
        $("body").addClass("modal-open");
    });

    //// Change theme
    $('.theme-controls span').click(function () {
        $('body').removeClass('skin-blue skin-green skin-orange skin-olive')
        var themeClass = $(this).attr('data-theme');
        let classColor = {};
        if (sessionStorage.getItem('themeClass') != null) {
            classColor = JSON.parse(sessionStorage.getItem('themeClass'));
        }
        classColor[sessionStorage.getItem('layout')] = themeClass;
        sessionStorage.setItem('themeClass', JSON.stringify(classColor));
        $('body').addClass(classColor[sessionStorage.getItem('layout')]);
    })
    //ends

    // Font size controller
    $('.theme-controls a').click(function () {
        $('html').removeClass('font-sm font-md font-lg')
        var themefontsize = $(this).attr('data-fontsize');
        sessionStorage.setItem('themefontsize', themefontsize);
        $('html').addClass(themefontsize);
    })

    // //// Change theme
    // $('.theme-controls span').click(function () {
    //     $('body').removeClass('skin-blue skin-green skin-orange skin-olive')
    //     var themeClass = $(this).attr('data-theme');
    //     $('body').addClass(themeClass);
    // })
    // //ends

    // // Font size controller
    // $('.theme-controls a').click(function () {
    //     $('html').removeClass('font-sm font-md font-lg')
    //     var themefontsize = $(this).attr('data-fontsize');
    //     $('html').addClass(themefontsize);
    // })


    // Initialize data-table
    if ($('.data-table').length > 0) {
        $('.data-table').DataTable({
            "aaSorting": [],
            "columnDefs": [{
                "targets": 'no-sort',
                "orderable": false,
            }],
            "language": hin_lang,
            "initComplete": btnTextHandler
        });
    }

    // data table without pagination
    $('.data-table-pagination').DataTable({
        "aaSorting": [],
        "bPaginate": false,
        "searching": false,
        "language": hin_lang,
        "initComplete": btnTextHandler
    });

    // disable paginations,filters and info if records less than 11
    if ($('.data-table-conditional').length > 0) {
        var dtableLen = $('.data-table-conditional').length;
        for (i = 0; i < dtableLen; i++) {
            $('.data-table-conditional').eq(i).DataTable({
                "fnInitComplete": function () {
                    if ($(this).find("tr:not(.ui-widget-header)").length <= 10) {
                        $(this).closest('.data-table-main').find('.dataTables_paginate,.dataTables_length,.dataTables_filter,.dataTables_info').hide();
                    }
                },
                "language": hin_lang,
                "initComplete": btnTextHandler,
                "aaSorting": []
            });
        }
    }

    // Initialize select 2
    if ($(".js-select2-common").length > 0) {
        $(".js-select2-common").select2({
            closeOnSelect: false,
            placeholder: "Select",
        });
        $('.js-select2-common').on('select2:select', function (e) {
            if ($(this).attr("multiple") == undefined) {
                $(this).select2("close");
            }
            // if ($(this).find("option[value='all']").is(":selected")) {
            //     $(this).find("option").attr("selected", true);
            //     $(".select2-results__option").attr("aria-selected", true);
            //     $(this).trigger("change");
            // }

        });
    }

    // select2 without searchbox
    if ($(".js-select2-nosearch").length > 0) {
        $(".js-select2-nosearch").select2({
            closeOnSelect: true,
            placeholder: "Select",
            minimumResultsForSearch: -1
        });
    }

    if ($(".js-select2-selectAll").length > 0) {
        $('.js-select2-selectAll').select2({
            placeholder: 'Select',
            dropdownAdapter: $.fn.select2.amd.require('select2/selectAllAdapter'),
        });
    }


    //summernote WYSWYG Editor
    if ($('.editor').length > 0) {
        $('.editor').summernote({
            tabsize: 2,
            height: 200,
            spellCheck: true
        });
    }

    //Datepicker General
    if ($(".datepicker").length > 0) {
        $('.datepicker').datepicker({
            autoclose: true,
            format: "dd/mm/yyyy",
            todayHighlight: true
        }).on('keydown paste', function (e) {
            e.preventDefault();
            return false;
        });
    }
    // Back date Disabled
    if ($(".datepicker-backDateDisabled").length > 0) {
        $('.datepicker-backDateDisabled').datepicker({
            autoclose: true,
            format: "dd/mm/yyyy",
            startDate: new Date(),
            todayHighlight: true,
        }).on('keydown paste', function (e) {
            e.preventDefault();
            return false;
        });
    }

    // Only future dates Selectable Datepicker
    if ($(".datepicker-futuredates").length > 0) {
        $('.datepicker-futuredates').datepicker({
            autoclose: true,
            format: "dd/mm/yyyy",
            startDate: '+1d',
            todayHighlight: true,
        }).on('keydown paste', function (e) {
            e.preventDefault();
            return false;
        });
    }

    // Month and year only
    if ($(".datepicker-month-year").length > 0) {
        $('.datepicker-month-year').datepicker({
            autoclose: true,
            format: "mm/yyyy",
            startView: "months",
            minViewMode: "months",
            // startDate: new Date(),

        }).on('keydown paste', function (e) {
            e.preventDefault();
            return false;
        });
    }
    // Month name and year only
    if ($(".datepicker-monthname-year").length > 0) {
        $('.datepicker-monthname-year').datepicker({
            autoclose: true,
            format: "M/yy",
            startView: "months",
            minViewMode: "months",
            // startDate: new Date(),

        }).on('keydown paste', function (e) {
            e.preventDefault();
            return false;
        });
    }
    // Year only
    if ($(".datepicker-year").length > 0) {
        $(".datepicker-year").datepicker({
            autoclose: true,
            format: "yyyy",
            viewMode: "years",
            minViewMode: "years"
        }).on('keydown paste', function (e) {
            e.preventDefault();
            return false;
        });
    }

    // Month only
    if ($(".datepicker-monthonly").length > 0) {
        $(".datepicker-monthonly").datepicker({
            autoclose: true,
            format: "mm",
            viewMode: "months",
            minViewMode: "months"
        }).on('keydown paste', function (e) {
            e.preventDefault();
            return false;
        });
    }

    // Year only --future year disabled
    if ($(".datepicker-past-year").length > 0) {
        $(".datepicker-past-year").datepicker({
            autoclose: true,
            format: "yyyy",
            viewMode: "years",
            minViewMode: "years",
            endDate: '+0y',
        }).on('keydown paste', function (e) {
            e.preventDefault();
            return false;
        });
    }

    // Only Monday Selectable Datepicker
    if ($(".datepicker-monday").length > 0) {
        $('.datepicker-monday').datepicker({
            autoclose: true,
            format: "dd/mm/yyyy",
            todayHighlight: true,
            daysOfWeekDisabled: "0,2,3,4,5,6"
        }).on('keydown paste', function (e) {
            e.preventDefault();
            return false;
        });
    }

    // Only Monday Selectable Datepicker
    if ($(".datepicker-futureDisabled").length > 0) {
        $('.datepicker-futureDisabled').datepicker({
            autoclose: true,
            format: "dd/mm/yyyy",
            todayHighlight: true,
            endDate: '+0y',
        }).on('keydown paste', function (e) {
            e.preventDefault();
            return false;
        });
    }

    // slect all in table checkbox
    var checkboxLen = $('.check-cell input').length;
    var checkedLen;
    $('.check-cell input').on("change", function (e) {
        checkedLen = 0
        $('.check-cell input').each(function () {
            if ($(this).prop('checked') == true) {
                checkedLen++
            }
        })
        if (checkboxLen == checkedLen) {
            $('.check-cell-all input').prop('checked', true)
        }
        else {
            $('.check-cell-all input').prop('checked', false)
        }
    })

    $('.check-cell-all').on("click", function (e) {
        if ($('.check-cell-all input').is(":checked")) {
            $(this).parents("table").find("td input[type='checkbox']").prop('checked', true);
        }
        else {
            $(this).parents("table").find("td input[type='checkbox']").prop('checked', false);
        }
    })


    //add user

    let count = 0;
    if ($('.add-user').length) {
        $('.add-user').click(function () {
            var template = ` <div class="user-input-group">
            <input type="text" class="form-control" placeholder="Employee Code">
            <input type="text" class="form-control" placeholder="Employee Name">
            <div class='remove-user'><span class='fa fa-trash fa-5' title='Remove field'></span></div></div>`;

            if (count < 1) {
                count++;
                $('.add-user-wrap').append(template);
            }
            if (count >= 1) { $(this).hide() }
        });
    }
    if ($('.user-input-group').length >= 1) {
        $('.add-user').hide();
    }

    $(document).on('click', '.remove-user', function () {
        count--;
        if (count < 1) {
            $('.add-user, .add-row').fadeIn("slow");
        }
        $(this).parents(".user-input-group").remove();
        if ($(this).parents("td")) {
            $(this).parents("tr").remove();
        }
    });

    //add row in table
    if ($('.add-row').length) {
        count = $('.add-emp tbody tr').length;
        $('.add-row').click(function () {
            if (count < 1) {
                $('.add-emp tbody').append("<tr><td><input type='text' onfocusout='addLinkOfficer(this)' placeholder='Employee Code' class='form-control'></td><td><input type='text' readonly placeholder='Employee Name' class='form-control employee_name'><div class='remove-user'><span class='fa fa-trash fa-5' title='Remove field'></span></div></td></tr>");
                count++;
            }
            if (count >= 1) { $('.add-row').hide() }
        });
    }
    if ($('.add-emp tbody tr').length >= 1) {
        $('.add-row').hide();
    }


    // Only first day of month Selectable Datepicker
    if ($(".datepicker-firstDay").length > 0) {
        $('.datepicker-firstDay').datepicker({
            autoclose: true,
            format: "dd/mm/yyyy",
            todayHighlight: true,
            beforeShowDay: function (d) {
                if (d.getDate() === 1) {
                    return true;
                } else {
                    return false;
                }
            }
        }).on('keydown paste', function (e) {
            e.preventDefault();
            return false;
        });;
    }
    // Leap Year Function
    function leapYear(year) {
        return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
    }
    //Only last day of month Selectable Datepicker  
    if ($(".datepicker-lastDay").length > 0) {
        $('.datepicker-lastDay').datepicker({
            autoclose: true,
            format: "dd/mm/yyyy",
            todayHighlight: true,
            beforeShowDay: function (d) {
                var _month = d.getMonth() + 1;
                if (_month > 7 && _month % 2 === 0 && d.getDate() === 31) { return true }
                else if (_month > 7 && _month % 2 === 1 && d.getDate() === 30) { return true; }
                if (leapYear(d.getFullYear())) {
                    if (_month === 2 && d.getDate() === 29) { return true }
                }
                else { if (_month === 2 && d.getDate() === 28) { return true } }
                if (_month < 8 && _month % 2 === 0 && d.getDate() === 30) { return true; }
                else if (_month < 8 && _month % 2 === 1 && d.getDate() === 31) { return true; }
                else { return false; }
            }
        }).on('keydown paste', function (e) {
            e.preventDefault();
            return false;
        });;
    }

    // Datepicker autocomplete off
    $('input[class^="form-control datepicker"], input[class^="datepicker"]').attr('autocomplete', 'off');

    // toggle action
    $('.toggle-input').click(function () {
        let toggle_parent = $(this).parent('.toggle-action');
        if ($(toggle_parent).find('.toggle-input').is(':checked')) {
            $(toggle_parent).addClass('active').attr("title", "Activate");
        } else {
            $(toggle_parent).removeClass('active').attr("title", "Deactivate");
        }
    })

    //tootltip
    $('[data-toggle="tooltip"]').tooltip();

    // timepicker 12 hr

    if ($(".timepicker-12-hr").length > 0) {
        $('.timepicker-12-hr').kendoTimePicker({
            dateInput: true,
            format: "HH:mm tt",
            interval: 1
        });
    }

    //Custom file upload
    $('.upload-file-box .btn').attr('type', 'button');
    $('.upload-file-box').append('Upload Document');
    $('body').on('click', '.upload-file-box', function () {
        $(this).children('input').trigger('click')
    })
    $("body").on("click", '.upload-file-box input[type=file]', function (e) {
        e.stopPropagation();
    })
    $("body").on("change", '.upload-file-box input[type=file]', function (e) {
        e.stopPropagation();
        let input = this;
        $(this).closest('.upload-file-box').contents().filter(function () {
            return this.nodeType === 3; // check text element
        }).remove(); // remove last file file name before uploading new file
        for (var i = 0; i < input.files.length; ++i) {
            $(this).closest('.upload-file-box').append(input.files.item(i).name + '   ')
        }
    })   //ends


    //remove astrick from readonly input fields
    $(":input[type=text][readonly='readonly']").closest(".form-group").removeClass("required")
    $("select[disabled]").closest(".form-group").removeClass("required");


    /* selecting FORM from dropdown list---using value */
    $('.show_selected_form').on('change', function () {
        $('.form_to_show').addClass("hide");
        $('#' + $(this).val()).removeClass("hide");
    });

    /* selecting FORM from dropdown list---using attribute */

    $('.show_selected_forms').on('change', function () {
        var _current_that = $(this).children("option:selected").attr("data-transfer_type");
        $('.forms_to_show').addClass("hide");
        $('#' + _current_that).removeClass("hide");
    });

    /* next previous in tabbing*/
    $('.next').click(function () {
        $('.nav-tabs > .active').next('li').find('a').trigger('click');
    });
    $('.previous').click(function () {
        $('.nav-tabs > .active').prev('li').find('a').trigger('click');
    });

    /*tab change on select option */
    $('.select-tab-content').hide();
    $('#select-tab-1').show();

    $('#tab-selection').change(function () {
        dropdown = $('#tab-selection').val();
        $('.select-tab-content').hide();
        $('#' + "select-tab-" + dropdown).show();
    });


    //Download pdf option in datatable 
    // var excluded_elem_new = [0,1,2,3];
    // $(document).on("click",".dt-button", function () {
    //     var test = $(this).find(".data-table-download").attr("data-exclude");
    //     console.log("click"); 
    // });





    $(function () {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        var hours = today.getHours();
        var mints = today.getMinutes();
        var seconds = today.getSeconds();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        var todayDate = dd + '/' + mm + '/' + yyyy;
        var today = dd + '/' + mm + '/' + yyyy + '  ' + hours + ':' + mints + ':' + seconds;

        var Rtitle = '';
        var Rdate = ' ';
        var location = '';
        var RBunit = '';
        var print_size = "A4", portrait = "portrait";
        if ($('.data-table-download tr th').length > 10) {
            print_size = "LEGAL";
            portrait = "landscape";
        }
        var title_name = document.title;
        var file_title = title_name != undefined ? title_name.replace('_', ' ') : 'FCI HRMS';
        var file_name = getFileNameWithDate(document.title);
        $('.data-table-download').DataTable({
            "searching": true,
            "ordering": true,
            "aaSorting": [],
            "language": hin_lang,
            "initComplete": btnTextHandler,
            "columnDefs": [{
                "targets": 'no-sort',
                "orderable": false,
            }],
            "paging": true,
            "pageLength": 2000,
            //"pageLength": 20,
            "info": true,
            dom: 'lBfrtip',
            "pageLength": 10,
            exportOptions: {
                modifier: {
                    page: 'current',
                    page: 'all',
                    search: 'none'
                }
            },
            buttons: [
                {
                    extend: "excel",
                    // title: "Records-table",
                    extension: '.xlsx',
                    title: file_title,
                    filename: file_name,
                    exportOptions: {
                        columns: ".included_column",
                    },
                },
                {
                    extend: 'pdfHtml5',
                    orientation: portrait,
                    pageSize: print_size,
                    // orientation: 'portrait',
                    // pageSize: 'A4',
                    footer: true,
                    //header: true,
                    // title: 'Report_left'+todayDate,
                    title: file_title,
                    filename: file_name,
                    exportOptions: {
                        columns: ".included_column",
                    },
                    customize: function (doc) {
                        doc.content.splice(1, 0, {
                            margin: [0, -50, 0, 10],
                            alignment: 'left',
                            image: 'data:image/jpeg;base64,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dEJvdHRvbWxvbmcAAAAAAAAADGNyb3BSZWN0TGVmdGxvbmcAAAAAAAAADWNyb3BSZWN0UmlnaHRsb25nAAAAAAAAAAtjcm9wUmVjdFRvcGxvbmcAAAAAADhCSU0D7QAAAAAAEABIAAAAAQACAEgAAAABAAI4QklNBCYAAAAAAA4AAAAAAAAAAAAAP4AAADhCSU0EDQAAAAAABAAAAFo4QklNBBkAAAAAAAQAAAAeOEJJTQPzAAAAAAAJAAAAAAAAAAABADhCSU0nEAAAAAAACgABAAAAAAAAAAI4QklNA/UAAAAAAEgAL2ZmAAEAbGZmAAYAAAAAAAEAL2ZmAAEAoZmaAAYAAAAAAAEAMgAAAAEAWgAAAAYAAAAAAAEANQAAAAEALQAAAAYAAAAAAAE4QklNA/gAAAAAAHAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAOEJJTQQAAAAAAAACAAE4QklNBAIAAAAAAAQAAAAAOEJJTQQwAAAAAAACAQE4QklNBC0AAAAAAAYAAQAAAAI4QklNBAgAAAAAABAAAAABAAACQAAAAkAAAAAAOEJJTQQeAAAAAAAEAAAAADhCSU0EGgAAAAADSQAAAAYAAAAAAAAAAAAAADwAAAA8AAAACgBVAG4AdABpAHQAbABlAGQALQA0AAAAAQAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAA8AAAAPAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAABAAAAABAAAAAAAAbnVsbAAAAAIAAAAGYm91bmRzT2JqYwAAAAEAAAAAAABSY3QxAAAABAAAAABUb3AgbG9uZwAAAAAAAAAATGVmdGxvbmcAAAAAAAAAAEJ0b21sb25nAAAAPAAAAABSZ2h0bG9uZwAAADwAAAAGc2xpY2VzVmxMcwAAAAFPYmpjAAAAAQAAAAAABXNsaWNlAAAAEgAAAAdzbGljZUlEbG9uZwAAAAAAAAAHZ3JvdXBJRGxvbmcAAAAAAAAABm9yaWdpbmVudW0AAAAMRVNsaWNlT3JpZ2luAAAADWF1dG9HZW5l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bG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjAtMDUtMjZUMTk6MDU6MTcrMDU6MzAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjAtMDUtMjZUMTk6MDU6MTcrMDU6MzAiIHhtcDpNb2RpZnlEYXRlPSIyMDIwLTA1LTI2VDE5OjA1OjE3KzA1OjMwIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjc1NDg0M2MzLTE0NjYtNDM0My1hN2U1LWQ5ZTU2MWRkMzU0ZCIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmI0YzZhZTAwLTlmNTUtMTFlYS1hMzA3LTljZjVjNzMwNmI1ZiIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjU0ZGFiNTlhLTFiZTItYWU0Mi04NTE4LTZiNTM5OGU4ZTJiZiIgZGM6Zm9ybWF0PSJpbWFnZS9qcGVnIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo1NGRhYjU5YS0xYmUyLWFlNDItODUxOC02YjUzOThlOGUyYmYiIHN0RXZ0OndoZW49IjIwMjAtMDUtMjZUMTk6MDU6MTcrMDU6MzAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NzU0ODQzYzMtMTQ2Ni00MzQzLWE3ZTUtZDllNTYxZGQzNTRkIiBzdEV2dDp3aGVuPSIyMDIwLTA1LTI2VDE5OjA1OjE3KzA1OjMwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDw/eHBhY2tldCBlbmQ9InciPz7/7gAhQWRvYmUAZEAAAAABAwAQAwIDBgAAAAAAAAAAAAAAAP/bAIQAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQICAgICAgICAgICAwMDAwMDAwMDAwEBAQEBAQEBAQEBAgIBAgIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMD/8IAEQgAPAA8AwERAAIRAQMRAf/EAMQAAAIDAAMBAAAAAAAAAAAAAAcIAAYJBAUKAQEAAQUBAQEBAAAAAAAAAAAAAAQFBgcIAwIBCRAAAQQCAgEDAwMFAAAAAAAABAMFBgcBAgAIEBITFCARFiExFSIjFxgJEQABBQABAwIFAQcFAAAAAAAEAQIDBQYHERITABQhMSIjFRYQIEEyNBcIUYEzlNQSAAIBAwMDAgMFBwQDAAAAAAECAxESBAAhBTFBEyIGUWEUEHGBkdEgsTJSIxUH8MFCM6HxFv/aAAwDAQECEQMRAAAA9+gB1NDqPxYvp94PngQlEhK6mW8r71EqSHUPiwHhZPet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'
                        },
                            {
                                alignment: 'left',
                                margin: [0, 0, 0, 10],
                                text: "",
                                fontSize: 9,
                                //text : 'Invoicing Report \n from : 01 Jan, 2016 - 31 Jan, 2016 \n Business Unit : Hyderabad',
                            });

                        var hcols = [];
                        var colour = "#076d38"
                        hcols[0] = { text: today, alignment: 'right', margin: [0, 20, 40, 10], fontSize: 8 };
                        var objHeader = {};
                        objHeader['alignment'] = 'left';
                        objHeader['columns'] = hcols;
                        doc["header"] = objHeader;
                        var cols = [];
                        //  cols[0] = {text: 'PRINT NAME AND TITLE', alignment: 'left', margin:[10] };
                        // cols[1] = {text: 'DATE:', alignment: 'right', margin:[0,0,20] };
                        var objFooter = {};
                        objFooter['alignment'] = 'center';
                        doc["footer"] = function (currentPage, pageCount) {
                            var footer = [
                                {
                                    alignment: 'center',
                                    stack: [
                                        {
                                            canvas: [
                                                {
                                                    type: 'line',
                                                    x1: 0,
                                                    y1: 0,
                                                    x2: 600,
                                                    y2: 0,
                                                    lineWidth: 0.5,
                                                    strokeStyle: 'blue',
                                                }
                                            ]
                                        },
                                        {
                                            text: 'This document is proprietary and confidential. No part of this document may be disclosed in any manner to a third party without the prior written consent \n of  Food Corporation of India.  ',
                                            color: 'grey',
                                            fontSize: 8,
                                            alignment: 'left',
                                            margin: [20, 2, 20, 0]
                                        },
                                        {
                                            text: 'Page ' + currentPage + " of " + pageCount,
                                            alignment: 'right',
                                            color: 'grey',
                                            fontSize: 8,
                                            margin: [0, 2, 20, 0]
                                        }
                                    ]
                                },

                            ];
                            objFooter['columns'] = footer;
                            return objFooter;
                        };

                    },
                    exportOptions: {
                        columns: ".included_column",
                    },
                },
                {
                    extend: 'print',
                    exportOptions: {
                        columns: ".included_column",
                    },
                }
            ]
        });

        $(".data-table-download").wrap("<div class='table-responsive'></div>");
    });

    // only for excel option 
    $(function () {
        var title_name = document.title;
        var file_title = title_name != undefined ? title_name.replace('_', ' ') : 'FCI HRMS';
        var file_name = getFileNameWithDate(document.title);
        $('.data-table-excel').DataTable({
            "searching": true,
            "ordering": true,
            "aaSorting": [],
            "columnDefs": [{
                "targets": 'no-sort',
                "orderable": false,
            }],
            "paging": true,
            "language": hin_lang,
            "initComplete": btnTextHandler,
            "pageLength": 2000,
            //"pageLength": 20,
            "info": true,
            dom: 'lBfrtip',
            "pageLength": 10,
            exportOptions: {
                modifier: {
                    page: 'current',
                    page: 'all',
                    search: 'none'
                }
            },
            buttons: [
                {
                    extend: "excel",
                    // title: "Records-table",
                    extension: '.xlsx',
                    title: file_title,
                    filename: file_name,
                    exportOptions: {
                        columns: ".included_column",
                    },
                },
            ]
        });

        $(".data-table-excel").wrap("<div class='table-responsive'></div>");
    });

    /**
     * Sticky icon 
     */

    $('.sticky-icon').hover(function (e) {
        $('#sticky-social').show();
        $('.sticky-icon').hide();
        $("#sticky-social").delay(6000).fadeOut("slow", function () {
            $('.sticky-icon').show();
        });
    });

    $(document).on('click', '.togglePassword', function () {
        let password_feild = $(this).parents('.password-wrap').find('input'), msg;
        if (password_feild.attr("type") == "password") {
            msg = "Hide Password";
            password_feild.attr("type", "text");
        } else {
            msg = "Show Password";
            password_feild.attr("type", "password");
        }
        $(this).toggleClass('fa-eye-slash');
        $(this).attr('title', msg);
    })
}); // document.ready ends


/*
 * selectMenuByProcessId
 * @param {*} id
 * @author Anchal Kesharwani <<acnhak.kesharwani@kelltontech.com>>
 */
function selectMenuByProcessId(id) {
    if (id == '') return;
    $("[data-process-id='" + id + "']").parent('li').addClass('active');
    $("[data-process-id='" + id + "']").parent('li').parent('ul').parent('li').addClass('active');
    $("[data-process-id='" + id + "']").parent('li').parent('ul').parent('li').parent('ul').parent('li').addClass('active');
    $("[data-process-id='" + id + "']").parent('li').parent('ul').parent('li').parent('ul').parent('li').parent('ul').parent('li').addClass('active');
}

/**
 * Get pdf name with date
 */

function getFileNameWithDate(name) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    let pdf_name_date = name.replace(' ', '_') + '_' + today;

    return pdf_name_date;
}

//


