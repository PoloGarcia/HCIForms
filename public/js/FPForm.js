var questions = undefined;
var numb_question = undefined;
var answered = [];
var is_this_required = false;
var current_question = undefined;
var current_index = undefined;
var interface_states = {
    'next': true,
    'previous': false,
    'submit': false
};
var is_error = false;
var percentage = undefined;

function update_answered(object_id) {
    if (answered.indexOf(object_id) == -1) {
        answered.push(object_id);
    }
    return answered.length;
}

function properties(question_to_check) {
    if ((question_to_check instanceof jQuery) == false) {
        question_to_check = $(question_to_check);
    }
    var inputs = question_to_check.find('input');
    var input_len = inputs.length;
    return [inputs, input_len];
}

function type_of_input(question_to_check) {
    var inputs = properties(question_to_check)[0];
    var input_len = properties(question_to_check)[1];
    var get_type = undefined
    if (input_len == 1) {
        get_type = inputs[0].type;
    } else {
        get_type = inputs[0].type
    }
    return get_type;
}

function is_required(question_to_check) {
    var inputs = properties(question_to_check)[0];
    var input_len = properties(question_to_check)[1];
    if (input_len == 1) {
        return $(inputs[0]).prop('required');
    } else {
        for (var i = 0; i < input_len; i++) {
            if ($(inputs[i]).prop('required')) {
                return true;
            }
        }
        return false;
    }
}

function is_empty(question_to_check) {
    var inputs = properties(question_to_check)[0];
    var input_len = properties(question_to_check)[1];
    if (input_len == 1) {
        return validator.isEmpty($(inputs[0]).val());
    } else {
        for (var i = 0; i < input_len; i++) {
            if ($(inputs[i]).is(':checked')) {
                return false;
            }
        }
        return true;
    }
}

function check_defectous_input(question_to_check) {
    var inputs = properties(question_to_check)[0];
    var type = type_of_input(question_to_check);
    var input_validate = $(inputs[0]).val();
    switch (type) {
        case 'email':
            if (validator.isEmail(input_validate)) {
                return {
                    'status': true,
                    'error': 'e-mail valido'
                };
            } else {
                return {
                    'status': false,
                    'error': 'por favor ingresa un mail valido'
                };
            }
            break;
        case 'number':
            if (validator.isDecimal(input_validate)) {
                return {
                    'status': true,
                    'error': 'numero valido'
                };
            } else {
                return {
                    'status': false,
                    'error': 'por favor ingresa solo numeros en este campo'
                };
            }
            break;
        case 'date':
            if (validator.isDate(input_validate)) {
                return {
                    'status': true,
                    'error': 'fecha valida'
                };
            } else {
                return {
                    'status': false,
                    'error': 'fecha invalida, por favor ingresa una fecha valida'
                };
            }
            break;
        default:
            return {
                'status': true,
                'error': 'fecha valida'
            };
    }
}

function insert_error_msg(question_to_check, message) {
    if ((question_to_check instanceof jQuery) === false) {
        question_to_check = $(question_to_check);
    }
    question_to_check.find('h5').remove();
    var msg = $('<h5></h5>');
    msg.addClass('error');
    msg.text(message);
    question_to_check.prepend(msg);
}

function clean_errors(question_to_check) {
    if ((question_to_check instanceof jQuery) === false) {
        question_to_check = $(question_to_check);
    }
    question_to_check.find('.error').remove();
}

function validate_for_advance(question_to_check) {
    var required = is_required(question_to_check);
    if (required) {
        if (is_empty(question_to_check)) {
            var results = {
                'status': false,
                'error': 'Este campo es requerido'
            };
            insert_error_msg(question_to_check, results.error);
            return results.status;
        } else {
            if (type_of_input(question_to_check) != 'text' ||
                type_of_input(question_to_check) != 'checkbox' ||
                type_of_input(question_to_check) != 'radio') {
                var results = check_defectous_input($(question_to_check));
                if (results.status === false) {
                    insert_error_msg(question_to_check, results.error);
                    is_error = true;
                    return results.status;
                } else {
                    clean_errors(question_to_check);
                    return results.status
                }
            } else {
                clean_errors(question_to_check);
                return true;
            }
        }
    } else {
        var results = {
            'status': true,
            'error': 'no error'
        };

        clean_errors(question_to_check);
        return results.status;
    }
}

function add_astheric(question_to_check){
  if(is_required(question_to_check)){
    if(!(question_to_check instanceof jQuery)){
      question_to_check =$(question_to_check);
    }
    $(question_to_check.find('.to-answer')[0]).append('*');
  }
}

$(document).ready(function() {
    //Setting Form ready
    questions = $('#questions-wrapper').find('.question-item');
    numb_question = questions.length;
    percentage = 100.00 / numb_question;
    $('.total-questions').text(numb_question);

    $('.question-item').each(function(index, value) {
        $(this).attr('id', 'question_' + index);
        add_astheric(this);
    });

    if (numb_question > 0) {
        current_index = 0;
        current_question = $(questions[current_index]);
        current_question.toggleClass('active-item');
        $('#previous').hide();
    } else {
        console.log('please add questions to the template');
    }

    $(document).on('keydown', function(e) {
        switch (e.which) {
            case 13:
                if (current_index == numb_question - 1) {
                    $('#submit').trigger("click");
                } else {
                    $('#next').trigger("click");
                }
                break;
            case 37:
                var focused = $(':focus');
                console.log()
                if (focused.is('input') === false) {
                    if (current_index !== 0 && current_index !== numb_question - 1) {
                        $('#previous').trigger("click");
                    }
                }
                break;
            case 39:
                var focused = $(':focus');
                if (focused.is('input') === false) {
                    if (current_index == numb_question - 1) {
                        $('#submit').trigger("click");
                    } else {
                        $('#next').trigger("click");
                    }
                    break;
                }
        }
    });

    $('#next').on('click', function(e) {
        e.preventDefault();
        if (validate_for_advance(current_question)) {
            if (current_index + 1 == numb_question - 1) {
                $('#next').css('display', 'none');
                $('#submit').css('display', 'inline-block');
            }
            $('.answered-questions').text(update_answered(current_question.prop('id')));
            var new_bar = answered.length * percentage;
            $('#advance-bar').animate({'width': new_bar + '%'},500);
            current_index += 1;
            current_question.toggleClass('active-item'); //Still the previous questions
            current_question = $(questions[current_index]);
            current_question.toggleClass('active-item'); //Here is the actual question
            $('#previous').css('display', 'inline-block');
        }
    });

    $('#previous').on('click', function(e) {
        if (current_index - 1 === 0) {
            $('#previous').css('display', 'none');
        } else if (current_index - 1 < numb_question - 1) {
            $('#next').css('display', 'inline-block');
            $('#submit').css('display', 'none');
        }
        e.preventDefault();
        current_index -= 1;
        current_question.toggleClass('active-item'); //Still the previous questions
        current_question = $(questions[current_index]);
        current_question.toggleClass('active-item');
    });

    $('#submit').on('click', function(e) {
        if (validate_for_advance(current_question)) {
            $('.answered-questions').text(update_answered(current_question.prop('id')));
            var new_bar = answered.length * percentage;
            $('#advance-bar').animate({'width': new_bar + '%'},500);
            e.preventDefault();
            $('#thanks-message').show();
            current_question.hide();
            $('#submit').hide();
            $('#previous').hide();
        }
    });
});
