import { extend, setInteractionMode } from 'vee-validate';
import { max, min, required } from 'vee-validate/dist/rules';

setInteractionMode('eager');

extend('required', {
  ...required,
  message: 'The {_field_} is required',
});
extend('min', { ...min, message: 'The {_field_} field must have at least {length} characters' });
extend('max', { ...max, message: 'The {_field_} field must have {max} characters at most' });
