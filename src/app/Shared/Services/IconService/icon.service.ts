import { Injectable } from '@angular/core';
import { 
  faFacebook, 
  faTwitter, 
  faLinkedin, 
  faTiktok, 
  faInstagram, 
  faYoutube, 
  faCcAmazonPay, 
  faCcPaypal, 
  faCcAmex, 
  faCcMastercard, 
  faAppStoreIos, 
  faGooglePlay ,
} from '@fortawesome/free-brands-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor() { }
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faLinkedin = faLinkedin;
  faTiktok = faTiktok;
  faInstagram = faInstagram;
  faYoutube = faYoutube;
  faCcPaypal = faCcPaypal;
  faCcAmex = faCcAmex;
  faCcMastercard = faCcMastercard;
  faCcAmazonPay = faCcAmazonPay;
  faAppStoreIos = faAppStoreIos;
  faGooglePlay = faGooglePlay;
  faStar = faStar;
}
