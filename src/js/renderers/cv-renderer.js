import { CVProfile } from "../models.js";

function list(items) {
  return `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

function chipList(items) {
  return items.map((item) => `<span class="tag">${item}</span>`).join("");
}

export class CVRenderer {
  constructor(data, locale) {
    this.profile = new CVProfile(data);
    this.locale = locale;
  }

  renderHero() {
    const c = this.profile;
    return `
      <section class="hero" id="about">
        <div class="hero-copy">
          <span class="eyebrow">${c.hero.eyebrow}</span>
          <h1>${c.site_title}</h1>
          <p class="hero-title">${c.hero.title}</p>
          <p class="hero-summary">${c.hero.summary}</p>
          <p class="availability-badge">${c.hero.badge}</p>

          <div class="hero-actions">
            <button class="btn btn-secondary copy-email-btn" type="button" data-email="23samjessen@gmail.com">${c.buttons.copy_email}</button>
            <button class="btn btn-secondary print-btn" type="button">${c.buttons.print}</button>
          </div>
        </div>

        <aside class="hero-panel">
          <div class="avatar" aria-hidden="true">SJ</div>
          <div class="contact-card">
            <h2>${c.contact.heading}</h2>
            <p><strong>${c.contact.location_label}:</strong> ${c.contact.location}</p>
            <p><strong>${c.contact.phone_label}:</strong> <a href="tel:+4553882302">+45 53 88 23 02</a></p>
            <p><strong>${c.contact.email_label}:</strong> <a href="mailto:23samjessen@gmail.com">23samjessen@gmail.com</a></p>
            <p><strong>${c.contact.nationality_label}:</strong> ${c.contact.nationality}</p>
          </div>
        </aside>
      </section>
    `;
  }

  renderStrengths() {
    const c = this.profile;
    return `
      <section class="content-section">
        <div class="info-card">
          <h2>${c.sections.strengths}</h2>
          ${list(c.sections.strength_list)}
        </div>
      </section>
    `;
  }

  renderExperience() {
    return `
      <section class="content-section" id="experience">
        <div class="section-heading"><h2>${this.profile.sections.experience}</h2></div>
        <div class="timeline">
          ${this.profile.experience.map((item) => `
            <article class="timeline-card">
              <div class="timeline-meta">
                <span class="timeline-period">${item.period}</span>
                <span class="timeline-location">${item.location}</span>
                <span class="timeline-company">${item.company}</span>
              </div>
              <div>
                <h3>${item.role}</h3>
                <p class="timeline-highlight">${item.highlight}</p>
                ${list(item.bullets)}
              </div>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  renderEducation() {
    return `
      <section class="content-section" id="education">
        <div class="section-heading"><h2>${this.profile.sections.education}</h2></div>
        <div class="card-grid">
          ${this.profile.education.map((item) => `
            <article class="info-card">
              <div class="info-topline">
                <span>${item.period}</span>
                <span>${item.location}</span>
              </div>
              <h3>${item.title}</h3>
              <p class="strong">${item.institution}</p>
              <p>${item.details}</p>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  renderSkills() {
    const s = this.profile.skills;
    return `
      <section class="content-section" id="skills">
        <div class="section-heading"><h2>${this.profile.sections.skills}</h2></div>
        <div class="split-grid align-start">
          <div class="card-grid">
            <article class="info-card">
              <h3>Governance</h3>
              <div class="tag-list">${chipList(s.governance)}</div>
            </article>
            <article class="info-card">
              <h3>Infrastructure & Networking</h3>
              <div class="tag-list">${chipList(s.infrastructure)}</div>
            </article>
            <article class="info-card">
              <h3>Security Operations & Tools</h3>
              <div class="tag-list">${chipList(s.operations)}</div>
            </article>
            <article class="info-card">
              <h3>Programming & Development</h3>
              <div class="tag-list">${chipList(s.development)}</div>
            </article>
          </div>

          <div class="card-grid">
            <article class="mini-card">
              <h3>Certifications</h3>
              <div class="mini-grid certifications-grid">
                ${this.profile.certifications.map((item) => `<span class="tag">${item}</span>`).join("")}
              </div>
            </article>

            <article class="mini-card">
              <h3>Languages</h3>
              <div class="languages-grid">
                ${this.profile.languages.map((lang) => `<span class="language-chip">${lang}</span>`).join("")}
              </div>
            </article>
          </div>
        </div>
      </section>
    `;
  }

  renderDocuments() {
    const docs = this.profile.documents;
    const recommendation = docs.recommendation || {};
    const mailHref = `mailto:${recommendation.request_email}?subject=${encodeURIComponent(recommendation.request_subject || "Request recommendation letter")}&body=${encodeURIComponent(recommendation.request_body || "Hello Sam,")}`;

    return `
      <section class="content-section" id="documents">
        <div class="section-heading"><h2>${this.profile.sections.documents}</h2></div>
        <p class="section-intro">${docs.intro || ""}</p>

        <div class="split-grid align-start documents-layout">
          <div class="card-grid">
            <article class="info-card document-collection-card">
              <div class="document-section-head">
                <h3>${docs.certificates_heading}</h3>
              </div>

              <div class="document-grid">
                ${(docs.certificates || []).map((item) => `
                  <article class="document-card">
                    <div class="document-card-top">
                      <span class="document-badge">${item.issuer}</span>
                      <h4>${item.title}</h4>
                    </div>
                    <div class="document-meta">
                      <p><strong>${docs.issuer_label}:</strong> ${item.issuer}</p>
                      <p><strong>${docs.issued_label}:</strong> ${item.issued}</p>
                      <p><strong>${docs.valid_label}:</strong> ${item.valid}</p>
                    </div>
                    <div class="document-actions">
                      <a class="btn btn-secondary" href="${item.file}" target="_blank" rel="noopener">${docs.open_pdf}</a>
                    </div>
                  </article>
                `).join("")}
              </div>
            </article>
          </div>

          <div class="card-grid">
            <article class="info-card recommendation-card">
              <div class="document-section-head">
                <h3>${docs.recommendation_heading}</h3>
                <span class="private-badge">${recommendation.privacy_badge}</span>
              </div>

              <h4 class="recommendation-title">${recommendation.title}</h4>
              <p>${recommendation.summary}</p>
              ${recommendation.points ? list(recommendation.points) : ""}
              ${recommendation.access_steps ? `
                <div class="access-flow-card">
                  <h4 class="access-flow-title">${recommendation.access_heading}</h4>
                  ${list(recommendation.access_steps)}
                </div>
              ` : ""}
              <p class="document-note">${recommendation.privacy_note}</p>

              <div class="document-actions">
                <a class="btn btn-primary" href="${mailHref}">${recommendation.request_label}</a>
                <button class="btn btn-secondary copy-email-btn" type="button" data-email="23samjessen@gmail.com">${docs.copy_email_label}</button>
              </div>
            </article>
          </div>
        </div>
      </section>
    `;
  }

  renderMotivationPreview(letterHref) {
    const letter = this.profile.motivation_letter;
    return `
      <section class="content-section" id="motivation">
        <div class="section-heading"><h2>${this.profile.sections.motivation}</h2></div>
        <article class="letter-card letter-preview">
          <p><strong>${letter.intro}</strong></p>
          <p>${letter.paragraphs[0]}</p>
          <p>${letter.paragraphs[1]}</p>
          <div class="letter-actions">
            <a class="btn btn-primary" href="${letterHref}">${this.profile.buttons.letter}</a>
          </div>
        </article>
      </section>
    `;
  }

  render(letterHref = "./motivation-letter.html") {
    return [
      this.renderHero(),
      this.renderStrengths(),
      this.renderExperience(),
      this.renderEducation(),
      this.renderSkills(),
      this.renderDocuments(),
      this.renderMotivationPreview(letterHref)
    ].join("");
  }
}
