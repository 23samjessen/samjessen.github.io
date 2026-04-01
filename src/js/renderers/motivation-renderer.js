
import { CVProfile } from "../models.js";

export class MotivationRenderer {
  constructor(data) {
    this.profile = new CVProfile(data);
  }

  render() {
    const letter = this.profile.motivation_letter;
    return `
      <section class="letter-page">
        <div class="section-heading"><h2>${letter.title}</h2></div>
        <article class="letter-card">
          <p><strong>${letter.intro}</strong></p>
          ${letter.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")}
          <p class="letter-signoff">${letter.signoff.replace(/\n/g, "<br>")}</p>

          <div class="letter-actions">
            <button class="btn btn-secondary print-btn" type="button">${this.profile.buttons.print}</button>
          </div>
        </article>
      </section>
    `;
  }
}
