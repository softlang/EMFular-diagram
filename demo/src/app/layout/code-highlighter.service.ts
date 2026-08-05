import { Injectable } from '@angular/core';
import { createHighlighter, Highlighter } from 'shiki';

@Injectable({
  providedIn: 'root'
})
export class CodeHighlighterService {

  private highlighter?: Highlighter;

  private async getHighlighter(): Promise<Highlighter> {
    if (!this.highlighter) {
      this.highlighter = await createHighlighter({
        themes: ['github-light'],
        langs: ['angular-html']
      });
    }

    return this.highlighter;
  }

  async highlight(code: string): Promise<string> {
    const highlighter = await this.getHighlighter();

    return highlighter.codeToHtml(code, {
      lang: 'angular-html',
      theme: 'github-light'
    });
  }
}