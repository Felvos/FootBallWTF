$(document).ready(function ()
{
    $('#login-form').on('submit', function (e) {
        e.preventDefault(); // предотвращение стандартной отправки формы
        var data = $(this).serialize(); // сериализация данных формы
        $.ajax({
            type: 'POST',
            url: '/login',
            data: data,
            success: function (response, textStatus, jqXHR) 
            {
                if (jqXHR.status === 200) 
                {
                    window.location.href="/main";
                }
            },
            error: function(jqXHR, textStatus, errorThrown)
            {
                if (jqXHR.status === 401) 
                {
                    console.log(jqXHR.responseJSON.message);
                    alert(jqXHR.responseJSON.message);
                }
                else
                {
                    console.log(jqXHR.responseJSON.message);
                    alert(jqXHR.responseJSON.message);
                }
            }
        });
    });

    $('#register-form').on('submit', function (e) {
        e.preventDefault(); // предотвращение стандартной отправки формы
        var data = $(this).serialize(); // сериализация данных формы

        $.ajax({
            type: 'POST',
            url: '/register',
            data: data,
            success: function (response, textStatus, jqXHR) 
            {
                if (jqXHR.status === 200) 
                {
                    alert(response.message);
                    window.location.href="/main";
                }
                
            },
            error: function(jqXHR, textStatus, errorThrown)
            {

                if (jqXHR.status === 401) 
                {
                    console.log(jqXHR.responseJSON.message);
                    alert(jqXHR.responseJSON.message);
                }
                else if(jqXHR.status === 500)
                {
                    console.log(jqXHR.responseJSON.message);
                    alert("Пользователь с таким именем уже имеется. Пожалуйста, введите другой логин.");
                }
            }
        });
    });

});