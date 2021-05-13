import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";

interface AsyncValidatorFn { 
    (c: AbstractControl): Promise<ValidationErrors|null>|Observable<ValidationErrors|null>
  }