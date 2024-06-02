$(document).ready(function() {
    $('#openProfile').click(function() {
        $('#profile-container').addClass('show');
    });

    $('#close-btn').click(function() {
        $('#profile-container').removeClass('show');
    });

    $('#logout-btn').click(function() {
        $.ajax({
            url: '/logout',
            type: 'POST',
            success: function(response) {
                window.location.href = '/';
            },
            error: function(error) {
                console.error('Ошибка при выходе:', error);
            }
        });
    });

    $('#change-password-btn').click(function() {
        $('#change-password-form').toggle();
    });


    $('#current-password, #new-password').on('input', function() {
        const currentPassword = $('#current-password').val();
        const newPassword = $('#new-password').val();
        $('#submit-password-change').prop('disabled', !(currentPassword && newPassword));
    });


});