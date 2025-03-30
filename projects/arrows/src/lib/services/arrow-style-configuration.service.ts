import { Injectable } from '@angular/core';
import {ArrowStyleConfiguration} from "../models/arrow-style-configuration";

/*****
 default implementation
 You can extend this base case with an own service implementation.
 Make sure to configure DI to use your service instead of this one
 In 20205, the way to do so is to declare it as provider in app.config.ts or app.component.ts
 providers: [{ provide: ArrowStyleConfigurationService, useClass: YourServiceImplementation }],
 See https://angular.dev/guide/di/dependency-injection-providers
 ***/
@Injectable({
  providedIn: 'root'
})
export class ArrowStyleConfigurationService {

  constructor() { }

  styleArrow(arrowType?: string): ArrowStyleConfiguration {
    return {
      color: 'black',
      dashed: [0]
    };
  }
}
