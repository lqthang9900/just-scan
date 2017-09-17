"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    verifyInput(fieldId, pageModel, config, configName)
        * fielId: id of configObject, argsObject (ex: args.object.id)
        * pageModel: page model
        * config: Object Config (ex: signUpConfig)
        * configName: name of object config (ex 'signUpConfig'), configName used by notifyPropertyChange method
*/
function verifyInput(fieldId, pageModel, config, configName) {
    var field;
    for (var i in config) {
        if (config[i].id == fieldId) {
            field = config[i];
            break;
        }
    }
    if (fieldId && field.errors) {
        for (var i in field.errors) {
            field.errors[i].error = false;
            field.error = false;
            field.messageError = ' ';
            switch (i) {
                case 'required':
                    field = checkRequired(field);
                    if (field.errors[i].error) {
                        // if error, Update view to show error
                        pageModel.notifyPropertyChange.call(pageModel, configName, config);
                        return false;
                    }
                    break;
                case 'length':
                    field = checkLength(field);
                    if (field.errors[i].error) {
                        // if error, Update view to show error
                        pageModel.notifyPropertyChange.call(pageModel, configName, config);
                        return false;
                    }
                    break;
                case 'format':
                    field = checkFormat(field);
                    if (field.errors[i].error) {
                        // if error, Update view to show error
                        pageModel.notifyPropertyChange.call(pageModel, configName, config);
                        return false;
                    }
                    break;
                case 'match':
                    var fieldIdMatch = field.matchField;
                    field = checkMatch(field, config[fieldIdMatch].value);
                    if (field.errors[i].error) {
                        // if error, Update view to show error
                        pageModel.notifyPropertyChange.call(pageModel, configName, config);
                        return false;
                    }
                    break;
                case 'invalid':
                    field = checkInvalid(field);
                    if (field.errors[i].error) {
                        // if error, Update view to show error
                        pageModel.notifyPropertyChange.call(pageModel, configName, config);
                        return false;
                    }
                    break;
                default:
                    break;
            }
        }
    }
    pageModel.notifyPropertyChange.call(pageModel, configName, config);
    return true;
}
exports.verifyInput = verifyInput;
function checkRequired(field) {
    if (field.value.trim()) {
        field.value = field.value.trim();
    }
    if (!field.value) {
        field.errors['required'].error = true;
        field.error = true;
        field.messageError = field.errors['required'].message;
    }
    return field;
}
function checkLength(field) {
    if (field.value.trim()) {
        field.value = field.value.trim();
    }
    if (field.value.length > field.errors['length'].max || field.value.length < field.errors['length'].min) {
        field.errors['length'].error = true;
        field.error = true;
        field.messageError = field.errors['length'].message;
    }
    return field;
}
function checkFormat(field) {
    var regex;
    if (field.value.trim()) {
        field.value = field.value.trim();
    }
    switch (field.type) {
        case 'phone':
            regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
            break;
        case 'password':
            regex = /^[a-zA-Z0-9]{8,12}$/;
            break;
        case 'id':
            regex = /^[a-zA-Z0-9_]+$/;
            break;
        case 'name':
            regex = /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý ]+$/;
            break;
        case 'number':
            regex = /^[0-9]+$/;
            break;
        case 'email':
            regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            break;
        default:
            break;
    }
    field.errors['format'].error = false;
    if (!regex.test(field.value)) {
        field.errors['format'].error = true;
        field.error = true;
        field.messageError = field.errors['format'].message;
    }
    return field;
}
function checkMatch(field, valueMatch) {
    if (field.value.trim()) {
        field.value = field.value.trim();
    }
    if (valueMatch.trim()) {
        valueMatch = valueMatch.trim();
    }
    field.errors['match'].error = false;
    if (field.value !== valueMatch) {
        field.errors['match'].error = true;
        field.error = true;
        field.messageError = field.errors['match'].message;
    }
    return field;
}
function checkInvalid(field) {
    var regex = /^[a-zA-Z0-9]{1,20}$/;
    if (!regex.test(field.value)) {
        field.errors['invalid'].error = true;
        field.error = true;
        field.messageError = field.errors['invalid'].message;
    }
    return field;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2YWxpZGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBOzs7Ozs7RUFNRTtBQUNGLHFCQUE0QixPQUFlLEVBQUUsU0FBYyxFQUFFLE1BQVcsRUFBRSxVQUFrQjtJQUN4RixJQUFJLEtBQVUsQ0FBQztJQUNmLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDbkIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzFCLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEIsS0FBSyxDQUFDO1FBQ1YsQ0FBQztJQUNMLENBQUM7SUFDRCxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDMUIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDekIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQzlCLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLEtBQUssQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO1lBQ3pCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1IsS0FBSyxVQUFVO29CQUNYLEtBQUssR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzdCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzt3QkFDeEIsc0NBQXNDO3dCQUN0QyxTQUFTLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUs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VSxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ2xDLENBQUM7SUFDRCxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDcEMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQzdCLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNuQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNuQixLQUFLLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDO0lBQ3ZELENBQUM7SUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFFRCxzQkFBc0IsS0FBSztJQUN2QixJQUFJLEtBQUssR0FBRyxxQkFBcUIsQ0FBQztJQUNsQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDckMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbkIsS0FBSyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUN6RCxDQUFDO0lBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUNqQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ2RhdGEvb2JzZXJ2YWJsZSc7XG5cbi8qXG4gICAgdmVyaWZ5SW5wdXQoZmllbGRJZCwgcGFnZU1vZGVsLCBjb25maWcsIGNvbmZpZ05hbWUpXG4gICAgICAgICogZmllbElkOiBpZCBvZiBjb25maWdPYmplY3QsIGFyZ3NPYmplY3QgKGV4OiBhcmdzLm9iamVjdC5pZClcbiAgICAgICAgKiBwYWdlTW9kZWw6IHBhZ2UgbW9kZWxcbiAgICAgICAgKiBjb25maWc6IE9iamVjdCBDb25maWcgKGV4OiBzaWduVXBDb25maWcpXG4gICAgICAgICogY29uZmlnTmFtZTogbmFtZSBvZiBvYmplY3QgY29uZmlnIChleCAnc2lnblVwQ29uZmlnJyksIGNvbmZpZ05hbWUgdXNlZCBieSBub3RpZnlQcm9wZXJ0eUNoYW5nZSBtZXRob2RcbiovXG5leHBvcnQgZnVuY3Rpb24gdmVyaWZ5SW5wdXQoZmllbGRJZDogc3RyaW5nLCBwYWdlTW9kZWw6IGFueSwgY29uZmlnOiBhbnksIGNvbmZpZ05hbWU6IHN0cmluZykge1xuICAgIHZhciBmaWVsZDogYW55O1xuICAgIGZvciAodmFyIGkgaW4gY29uZmlnKSB7XG4gICAgICAgIGlmIChjb25maWdbaV0uaWQgPT0gZmllbGRJZCkge1xuICAgICAgICAgICAgZmllbGQgPSBjb25maWdbaV07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoZmllbGRJZCAmJiBmaWVsZC5lcnJvcnMpIHtcbiAgICAgICAgZm9yICh2YXIgaSBpbiBmaWVsZC5lcnJvcnMpIHtcbiAgICAgICAgICAgIGZpZWxkLmVycm9yc1tpXS5lcnJvciA9IGZhbHNlO1xuICAgICAgICAgICAgZmllbGQuZXJyb3IgPSBmYWxzZTtcbiAgICAgICAgICAgIGZpZWxkLm1lc3NhZ2VFcnJvciA9ICcgJztcbiAgICAgICAgICAgIHN3aXRjaCAoaSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3JlcXVpcmVkJzpcbiAgICAgICAgICAgICAgICAgICAgZmllbGQgPSBjaGVja1JlcXVpcmVkKGZpZWxkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkLmVycm9yc1tpXS5lcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgZXJyb3IsIFVwZGF0ZSB2aWV3IHRvIHNob3cgZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VNb2RlbC5ub3RpZnlQcm9wZXJ0eUNoYW5nZS5jYWxsKHBhZ2VNb2RlbCwgY29uZmlnTmFtZSwgY29uZmlnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdsZW5ndGgnOlxuICAgICAgICAgICAgICAgICAgICBmaWVsZCA9IGNoZWNrTGVuZ3RoKGZpZWxkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkLmVycm9yc1tpXS5lcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgZXJyb3IsIFVwZGF0ZSB2aWV3IHRvIHNob3cgZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VNb2RlbC5ub3RpZnlQcm9wZXJ0eUNoYW5nZS5jYWxsKHBhZ2VNb2RlbCwgY29uZmlnTmFtZSwgY29uZmlnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdmb3JtYXQnOlxuICAgICAgICAgICAgICAgICAgICBmaWVsZCA9IGNoZWNrRm9ybWF0KGZpZWxkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkLmVycm9yc1tpXS5lcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgZXJyb3IsIFVwZGF0ZSB2aWV3IHRvIHNob3cgZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VNb2RlbC5ub3RpZnlQcm9wZXJ0eUNoYW5nZS5jYWxsKHBhZ2VNb2RlbCwgY29uZmlnTmFtZSwgY29uZmlnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdtYXRjaCc6XG4gICAgICAgICAgICAgICAgICAgIHZhciBmaWVsZElkTWF0Y2ggPSBmaWVsZC5tYXRjaEZpZWxkO1xuICAgICAgICAgICAgICAgICAgICBmaWVsZCA9IGNoZWNrTWF0Y2goZmllbGQsIGNvbmZpZ1tmaWVsZElkTWF0Y2hdLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkLmVycm9yc1tpXS5lcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgZXJyb3IsIFVwZGF0ZSB2aWV3IHRvIHNob3cgZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VNb2RlbC5ub3RpZnlQcm9wZXJ0eUNoYW5nZS5jYWxsKHBhZ2VNb2RlbCwgY29uZmlnTmFtZSwgY29uZmlnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdpbnZhbGlkJzpcbiAgICAgICAgICAgICAgICAgICAgZmllbGQgPSBjaGVja0ludmFsaWQoZmllbGQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmllbGQuZXJyb3JzW2ldLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiBlcnJvciwgVXBkYXRlIHZpZXcgdG8gc2hvdyBlcnJvclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFnZU1vZGVsLm5vdGlmeVByb3BlcnR5Q2hhbmdlLmNhbGwocGFnZU1vZGVsLCBjb25maWdOYW1lLCBjb25maWcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHBhZ2VNb2RlbC5ub3RpZnlQcm9wZXJ0eUNoYW5nZS5jYWxsKHBhZ2VNb2RlbCwgY29uZmlnTmFtZSwgY29uZmlnKTtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuXG5mdW5jdGlvbiBjaGVja1JlcXVpcmVkKGZpZWxkKSB7XG4gICAgaWYgKGZpZWxkLnZhbHVlLnRyaW0oKSkge1xuICAgICAgICBmaWVsZC52YWx1ZSA9IGZpZWxkLnZhbHVlLnRyaW0oKVxuICAgIH1cbiAgICBpZiAoIWZpZWxkLnZhbHVlKSB7XG4gICAgICAgIGZpZWxkLmVycm9yc1sncmVxdWlyZWQnXS5lcnJvciA9IHRydWU7XG4gICAgICAgIGZpZWxkLmVycm9yID0gdHJ1ZTtcbiAgICAgICAgZmllbGQubWVzc2FnZUVycm9yID0gZmllbGQuZXJyb3JzWydyZXF1aXJlZCddLm1lc3NhZ2U7XG4gICAgfVxuICAgIHJldHVybiBmaWVsZDtcbn1cbmZ1bmN0aW9uIGNoZWNrTGVuZ3RoKGZpZWxkKSB7XG4gICAgaWYgKGZpZWxkLnZhbHVlLnRyaW0oKSkge1xuICAgICAgICBmaWVsZC52YWx1ZSA9IGZpZWxkLnZhbHVlLnRyaW0oKVxuICAgIH1cbiAgICBpZiAoZmllbGQudmFsdWUubGVuZ3RoID4gZmllbGQuZXJyb3JzWydsZW5ndGgnXS5tYXggfHwgZmllbGQudmFsdWUubGVuZ3RoIDwgZmllbGQuZXJyb3JzWydsZW5ndGgnXS5taW4pIHtcbiAgICAgICAgZmllbGQuZXJyb3JzWydsZW5ndGgnXS5lcnJvciA9IHRydWU7XG4gICAgICAgIGZpZWxkLmVycm9yID0gdHJ1ZTtcbiAgICAgICAgZmllbGQubWVzc2FnZUVycm9yID0gZmllbGQuZXJyb3JzWydsZW5ndGgnXS5tZXNzYWdlO1xuICAgIH1cbiAgICByZXR1cm4gZmllbGQ7XG59XG5cbmZ1bmN0aW9uIGNoZWNrRm9ybWF0KGZpZWxkKSB7XG4gICAgdmFyIHJlZ2V4O1xuICAgIGlmIChmaWVsZC52YWx1ZS50cmltKCkpIHtcbiAgICAgICAgZmllbGQudmFsdWUgPSBmaWVsZC52YWx1ZS50cmltKClcbiAgICB9XG4gICAgc3dpdGNoIChmaWVsZC50eXBlKSB7XG4gICAgICAgIGNhc2UgJ3Bob25lJzpcbiAgICAgICAgICAgIHJlZ2V4ID0gL15bXFwrXT9bKF0/WzAtOV17M31bKV0/Wy1cXHNcXC5dP1swLTldezN9Wy1cXHNcXC5dP1swLTldezQsNn0kL2ltO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3Bhc3N3b3JkJzpcbiAgICAgICAgICAgIHJlZ2V4ID0gL15bYS16QS1aMC05XXs4LDEyfSQvO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2lkJzpcbiAgICAgICAgICAgIHJlZ2V4ID0gL15bYS16QS1aMC05X10rJC87XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnbmFtZSc6XG4gICAgICAgICAgICByZWdleCA9IC9eW2EtekEtWl/DgMOBw4LDg8OIw4nDisOMw43DksOTw5TDlcOZw5rEgsSQxKjFqMagw6DDocOiw6PDqMOpw6rhur/DrMOtw7LDs8O0w7XDucO6xIPEkcSpxanGocavxILhuqDhuqLhuqThuqbhuqjhuqrhuqzhuq7hurDhurLhurThurbhurjhurrhurzhu4Dhu4Dhu4LGsMSD4bqh4bqj4bql4bqn4bqp4bqr4bqt4bqv4bqx4bqz4bq14bq34bq54bq74bq94buB4buB4buD4buE4buG4buI4buK4buM4buO4buQ4buS4buU4buW4buY4bua4buc4bue4bug4bui4buk4bum4buo4buq4buF4buH4buJ4buL4buN4buP4buR4buT4buV4buX4buZ4bub4bud4buf4buh4buj4bul4bun4bup4bur4bus4buu4buw4buy4bu0w53hu7bhu7jhu63hu6/hu7Hhu7Phu7Xhu7fhu7nDvSBdKyQvO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgICByZWdleCA9IC9eWzAtOV0rJC87XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZW1haWwnOlxuICAgICAgICAgICAgcmVnZXggPSAvXigoW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKyhcXC5bXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKSopfChcIi4rXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31dKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkLztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGZpZWxkLmVycm9yc1snZm9ybWF0J10uZXJyb3IgPSBmYWxzZTtcbiAgICBpZiAoIXJlZ2V4LnRlc3QoZmllbGQudmFsdWUpKSB7XG4gICAgICAgIGZpZWxkLmVycm9yc1snZm9ybWF0J10uZXJyb3IgPSB0cnVlO1xuICAgICAgICBmaWVsZC5lcnJvciA9IHRydWU7XG4gICAgICAgIGZpZWxkLm1lc3NhZ2VFcnJvciA9IGZpZWxkLmVycm9yc1snZm9ybWF0J10ubWVzc2FnZTtcbiAgICB9XG4gICAgcmV0dXJuIGZpZWxkO1xufVxuXG5mdW5jdGlvbiBjaGVja01hdGNoKGZpZWxkLCB2YWx1ZU1hdGNoKSB7XG4gICAgaWYgKGZpZWxkLnZhbHVlLnRyaW0oKSkge1xuICAgICAgICBmaWVsZC52YWx1ZSA9IGZpZWxkLnZhbHVlLnRyaW0oKTtcbiAgICB9XG4gICAgaWYgKHZhbHVlTWF0Y2gudHJpbSgpKSB7XG4gICAgICAgIHZhbHVlTWF0Y2ggPSB2YWx1ZU1hdGNoLnRyaW0oKVxuICAgIH1cbiAgICBmaWVsZC5lcnJvcnNbJ21hdGNoJ10uZXJyb3IgPSBmYWxzZTtcbiAgICBpZiAoZmllbGQudmFsdWUgIT09IHZhbHVlTWF0Y2gpIHtcbiAgICAgICAgZmllbGQuZXJyb3JzWydtYXRjaCddLmVycm9yID0gdHJ1ZTtcbiAgICAgICAgZmllbGQuZXJyb3IgPSB0cnVlO1xuICAgICAgICBmaWVsZC5tZXNzYWdlRXJyb3IgPSBmaWVsZC5lcnJvcnNbJ21hdGNoJ10ubWVzc2FnZTtcbiAgICB9XG4gICAgcmV0dXJuIGZpZWxkO1xufVxuXG5mdW5jdGlvbiBjaGVja0ludmFsaWQoZmllbGQpIHtcbiAgICB2YXIgcmVnZXggPSAvXlthLXpBLVowLTldezEsMjB9JC87XG4gICAgaWYgKCFyZWdleC50ZXN0KGZpZWxkLnZhbHVlKSkge1xuICAgICAgICBmaWVsZC5lcnJvcnNbJ2ludmFsaWQnXS5lcnJvciA9IHRydWU7XG4gICAgICAgIGZpZWxkLmVycm9yID0gdHJ1ZTtcbiAgICAgICAgZmllbGQubWVzc2FnZUVycm9yID0gZmllbGQuZXJyb3JzWydpbnZhbGlkJ10ubWVzc2FnZTtcbiAgICB9XG4gICAgcmV0dXJuIGZpZWxkO1xufVxuXG4iXX0=