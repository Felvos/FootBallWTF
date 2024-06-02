$(document).ready(function() {

    $('#fio, #mail, #message').on('input', function() {
        let allFilled = true;
        $('#fio, #mail, #message').each(function() {
            if ($(this).val() === '') {
                allFilled = false;
            }
        });
        $('#submit-button').prop('disabled', !allFilled);
    });

    $('#feedback-form').on('submit', function(e) {
        e.preventDefault();
        var data = $(this).serialize();

        $.ajax({
            type: 'POST',
            url: '/feedback/sendfeedback',
            data: data,
            success: function(response) {
                $('#feedback-form').hide();
                $('#success-message').removeClass('hidden');
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('Ошибка отправки формы. Пожалуйста, попробуйте еще раз.');
            }
        });
    });
});