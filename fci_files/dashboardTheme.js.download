
if(sessionStorage.getItem('themeClass') != null){
    jQuery('body').removeClass('skin-blue skin-green skin-orange skin-olive');
    let themeClass=JSON.parse(sessionStorage.getItem('themeClass'));
    if(themeClass.ess!=null && sessionStorage.getItem('layout')=='ess'){
        jQuery('body').addClass(themeClass.ess);
    }
    else if(themeClass.mss!=null && sessionStorage.getItem('layout')=='mss'){
        jQuery('body').addClass(themeClass.mss);
    }
    if(themeClass.ess==null && sessionStorage.getItem('layout')=='ess'){
        jQuery('body').addClass('skin-blue');
    }
    if(themeClass.mss==null && sessionStorage.getItem('layout')=='mss'){
        jQuery('body').addClass('skin-green');
    }
}

if(sessionStorage.getItem('themefontsize') != null){
    jQuery('html').removeClass('font-sm font-md font-lg')
    jQuery('html').addClass(sessionStorage.getItem('themefontsize'));
}

jQuery(window).on('load', function(){
    hideLoader();
});

function showLoader(){
    document.querySelectorAll(".theLoader")[0].style.display = "flex";
}

function hideLoader(){
    document.querySelectorAll(".theLoader")[0].style.display = "none";
}