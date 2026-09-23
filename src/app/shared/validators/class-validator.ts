import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { validateSync, ValidationError } from 'class-validator'
import {plainToInstance} from 'class-transformer'
export function validateDTO<T extends object>(dtoClass : new () => T) : ValidatorFn{
  return(control : AbstractControl): ValidationErrors | null =>{
    if(!control || !control.value) return null
    const dtoInstance = plainToInstance(dtoClass , control.value)
    const errors: ValidationError[] = validateSync(dtoInstance, {
      skipMissingProperties: true,
      whitelist: true,
    });
    if(errors.length === 0) return null

    const formErrors : Record<string , string> = {}
    errors.forEach((err)=>{
      const fieldControl = control.get(err.property)
      const firstErrorMsg = err.constraints ? Object.values(err.constraints)[0] : 'قيمة غير صالحة'
      if (fieldControl) {
        fieldControl.setErrors({dtoError : firstErrorMsg})
      }
      formErrors[err.property] = firstErrorMsg
    })
    return formErrors
  }
}
