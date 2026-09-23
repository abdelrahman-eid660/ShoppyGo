import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { SpinnerService } from "../service/spinner.service";
import { finalize } from "rxjs";

export const APIInterceptor : HttpInterceptorFn = (req , next)=>{
  const spinnerServic = inject(SpinnerService)
  spinnerServic.show()
  return next(req).pipe(finalize(()=> spinnerServic.hide))
}
