import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <header class="topbar">
      <div class="logo-chip">BH</div>
      <h1>BH Bank — Tableau de Bord Sécurité &amp; Conformité KYC</h1>
    </header>
    <iframe [src]="reportUrl" title="BH Bank Dashboard" allowfullscreen></iframe>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
      overflow: hidden;
      background: #1A1A1D;
    }
    .topbar {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 24px;
      background: #1A1A1D;
      color: white;
      border-bottom: 2px solid #E31837;
    }
    .logo-chip {
      background: #E31837;
      color: #FFFFFF;
      font-weight: 800;
      font-size: 14px;
      padding: 4px 8px;
      border-radius: 4px;
      letter-spacing: 0.5px;
    }
    h1 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
    }
    iframe {
      width: 100%;
      height: calc(100vh - 58px);
      border: none;
      display: block;
    }
  `]
})
export class DashboardComponent {
  reportUrl: SafeResourceUrl;

  constructor(sanitizer: DomSanitizer) {
    this.reportUrl = sanitizer.bypassSecurityTrustResourceUrl(
      'https://app.powerbi.com/reportEmbed?reportId=7cd0b7f6-c0a5-4668-9bdb-d1335bc75840&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730'
    );
  }
}
