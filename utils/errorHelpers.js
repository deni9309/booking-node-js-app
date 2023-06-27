const { MongooseError, Error, ValidationError } = require('mongoose');

exports.getErrorMessages = (err) => {
    if (err instanceof MongooseError || err instanceof Error.ValidationError) {
        return Object.values(err.errors).map(e => e.message);
    } else {
        return err.message;
    }
};

exports.getErrorFields = (err) => {
    if (err instanceof MongooseError || err instanceof Error.ValidationError) {
        return Object.assign(err.errors);
    } else {
        return err.message;
    }
};

exports.getValidationResultErrorFields = (err) => {
    return Object.fromEntries(err.map(e => [e.path, e.path]));
}

exports.getValidationResultErrorMessages = (err) => {
    return Object.assign(err.map(e => e.msg));
}

exports.extractErrors = (error) => {
    const result = {
        messages: [],
        fields: {},
    };

    if (error.name == 'ValidationError') {  //mongoose type
        for (let [field, err] of Object.entries(error.errors)) {
            result.messages.push(err.message);

            result.fields[field] = field;  //sets the key
        }
    } else if (Array.isArray(error)) {  //express-validator type
        result.messages = error.map(e => e.msg);

        result.fields = Object.fromEntries(error.map(e => [e.path, e.path]));
    } else {
        result.messages = error.message.split('\n');
        result.messages = result.messages.map(m => m.charAt(0).toUpperCase() + m.slice(1));

        result.fields = Object.values(result.messages).map(x => (x.slice(0, x.indexOf(' '))));
        result.fields = Object.values(result.fields).map(v => v.charAt(0).toLowerCase() + v.slice(1))
        result.fields = Object.fromEntries((result.fields).map(x => [x, x]));
    }

    return result;
}