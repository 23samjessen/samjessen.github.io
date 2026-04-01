
export class ExperienceItem {
  constructor({ period, location, role, company, highlight, bullets }) {
    this.period = period;
    this.location = location;
    this.role = role;
    this.company = company;
    this.highlight = highlight;
    this.bullets = bullets || [];
  }
}

export class EducationItem {
  constructor({ period, location, title, institution, details }) {
    this.period = period;
    this.location = location;
    this.title = title;
    this.institution = institution;
    this.details = details;
  }
}

export class MotivationLetter {
  constructor({ title, intro, paragraphs, signoff }) {
    this.title = title;
    this.intro = intro;
    this.paragraphs = paragraphs || [];
    this.signoff = signoff;
  }
}

export class CVProfile {
  constructor(payload) {
    this.meta_title = payload.meta_title;
    this.meta_description = payload.meta_description;
    this.site_title = payload.site_title;
    this.nav = payload.nav;
    this.buttons = payload.buttons;
    this.hero = payload.hero;
    this.contact = payload.contact;
    this.sections = payload.sections;
    this.experience = (payload.experience || []).map((item) => new ExperienceItem(item));
    this.education = (payload.education || []).map((item) => new EducationItem(item));
    this.certifications = payload.certifications || [];
    this.skills = payload.skills;
    this.languages = payload.languages || [];
    this.motivation_letter = new MotivationLetter(payload.motivation_letter);
    this.documents = payload.documents || {};
  }
}
