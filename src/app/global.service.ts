import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  //caminho para o servidor de api(neste caso utiliza uma reverse proxy)
  public static HOST_API_PATH : string="/api/";
  constructor() { }
}
