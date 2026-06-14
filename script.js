(function () {
  const checkedDate = "2026-06-06";
  const recentWindow = "2021-2026";
  const officialSources = {
    nsf: {
      label: "NSF",
      name: "NSF Award Search",
      url: "https://www.nsf.gov/funding/award-search"
    },
    arc: {
      label: "ARC",
      name: "ARC Grants Search",
      url: "https://dataportal.arc.gov.au/ncgp/web/grant/grants"
    },
    erc: {
      label: "ERC",
      name: "ERC ERIS / CORDIS",
      url: "https://erc.europa.eu/projects-figures/erc-research-information-system"
    }
  };

  const searchedNames = {
    "Dr Derrick Ong Sek Tong": {
      nsf: "Derrick Ong Sek Tong",
      arc: "Derrick Ong",
      erc: "Derrick Ong"
    },
    "Dr Cheok Chit Fang": {
      nsf: "Cheok Chit Fang",
      arc: "Cheok Chit Fang",
      erc: "Cheok Chit Fang"
    },
    "A/Prof Deng Lih Wen": {
      nsf: "Deng Lih Wen",
      arc: "Deng Lih Wen",
      erc: "Deng Lih Wen"
    },
    "A/Prof Anand Jeyasekharan": {
      nsf: "Anand Jeyasekharan",
      arc: "Anand Jeyasekharan",
      erc: "Anand Jeyasekharan"
    },
    "A/Prof Dennis Kappei": {
      nsf: "Dennis Kappei",
      arc: "Dennis Kappei",
      erc: "Dennis Kappei"
    },
    "A/Prof Polly Leilei Chen": {
      nsf: "Polly Leilei Chen",
      arc: "Polly Chen",
      erc: "Polly Leilei Chen"
    },
    "Dr Jason Pitt": {
      nsf: "Jason Pitt",
      arc: "Jason Pitt",
      erc: "Jason Pitt"
    },
    "A/Prof Boon Cher Goh": {
      nsf: "Boon Cher Goh",
      arc: "Boon Cher Goh",
      erc: "Boon Cher Goh"
    },
    "A/Prof Lina H.K. Lim": {
      nsf: "Lina H K Lim",
      arc: "Lina Lim",
      erc: "Lina Lim"
    },
    "A/Prof Celestial Yap": {
      nsf: "Celestial Yap",
      arc: "Celestial Yap",
      erc: "Celestial Yap"
    },
    "Dr Anthony Khong": {
      nsf: "Anthony Khong",
      arc: "Anthony Khong",
      erc: "Anthony Khong"
    },
    "Prof Nicholas Gascoigne": {
      nsf: "Nicholas Gascoigne",
      arc: "Nicholas Gascoigne",
      erc: "Nicholas Gascoigne"
    },
    "Prof Dario Campana": {
      nsf: "Dario Campana",
      arc: "Dario Campana",
      erc: "Dario Campana"
    }
  };

  function sourceLinksFor(personName) {
    const terms = searchedNames[personName];
    return {
      nsf: `https://www.research.gov/awardapi-service/v1/awards.json?pdPIName=${encodeURIComponent(terms.nsf)}&rpp=5`,
      arc: `https://dataportal.arc.gov.au/NCGP/API/grants?page%5Bsize%5D=5&page%5Bnumber%5D=1&filter=${encodeURIComponent(`"${terms.arc}"`)}`,
      erc: `https://cordis.europa.eu/search/en?q=${encodeURIComponent(`'${terms.erc}' AND ('European Research Council' OR ERC)`)}`,
    };
  }

  function emptyGrantSignal(personName) {
    const links = sourceLinksFor(personName);
    return {
      countRecent: { nsf: 0, arc: 0, erc: 0 },
      projects: [],
      expirySummary: "No 2021-2026 NSF/ARC/ERC project end date found. / 未找到 2021-2026 NSF/ARC/ERC 公开项目到期时间。",
      checkedDate,
      note: "Official NSF and ARC name searches returned no public PI records; ERC/CORDIS search found no countable ERC PI project. Publication-author or unrelated same-name hits are not counted. / NSF 与 ARC 官方姓名检索未返回公开 PI 记录；ERC/CORDIS 未找到可计入的 ERC PI 项目。论文作者或无法确认的同名结果不计入。",
      sources: [
        { label: officialSources.nsf.label, name: officialSources.nsf.name, url: links.nsf },
        { label: officialSources.arc.label, name: officialSources.arc.name, url: links.arc },
        { label: officialSources.erc.label, name: officialSources.erc.name, url: links.erc }
      ]
    };
  }

  const grantSignals = Object.fromEntries(
    Object.keys(searchedNames).map((name) => [name, emptyGrantSignal(name)])
  );

  const contactSignals = {
    "Dr Derrick Ong Sek Tong": {
      email: "phsostd@nus.edu.sg",
      phone: "+65 6516 3232 (Office); +65 6516 3234 (Lab)",
      source: "NUS Physiology profile"
    },
    "Dr Cheok Chit Fang": {
      email: "patcfc@nus.edu.sg",
      phone: "+65 6772 7843",
      source: "NUS Pathology profile"
    },
    "A/Prof Deng Lih Wen": {
      email: "bchdlw@nus.edu.sg",
      phone: "+65 6516 1239",
      source: "NUS Biochemistry profile"
    },
    "A/Prof Anand Jeyasekharan": {
      email: "csiadj@nus.edu.sg",
      phone: "",
      source: "NUS CSI profile"
    },
    "A/Prof Dennis Kappei": {
      email: "dennis.kappei@nus.edu.sg",
      phone: "",
      source: "NUS CSI profile"
    },
    "A/Prof Polly Leilei Chen": {
      email: "polly_chen@nus.edu.sg",
      phone: "",
      source: "NUS CSI profile"
    },
    "Dr Jason Pitt": {
      email: "jason.j.pitt@nus.edu.sg",
      phone: "",
      source: "NUS CSI profile"
    },
    "A/Prof Boon Cher Goh": {
      email: "boon_cher_goh@nuhs.edu.sg",
      phone: "",
      source: "NUS CSI profile"
    },
    "A/Prof Lina H.K. Lim": {
      email: "phslhkl@nus.edu.sg",
      phone: "+65 6516 5515 (Office)",
      source: "NUS Physiology profile"
    },
    "A/Prof Celestial Yap": {
      email: "celestial_therese_yap@nuhs.edu.sg",
      phone: "+65 6516 8513 (Lab)",
      source: "NUS Physiology lab contact page"
    },
    "Dr Anthony Khong": {
      email: "khonga@nus.edu.sg",
      phone: "",
      source: "NUS CSI profile"
    },
    "Prof Nicholas Gascoigne": {
      email: "micnrjg@nus.edu.sg",
      phone: "+65 6516 3281; +65 6601 3509 (Lab)",
      source: "NUS Microbiology & Immunology profile"
    },
    "Prof Dario Campana": {
      email: "paedc@nus.edu.sg",
      phone: "+65 6601 2666",
      source: "Public NUS-affiliated correspondence records"
    }
  };

  const supervisorList = document.querySelector("#supervisorList");
  const searchInput = document.querySelector("#searchInput");
  if (!supervisorList || !searchInput) return;

  const supervisorCache = Array.from(supervisorList.querySelectorAll(".supervisor")).map((card) => {
    const name = card.querySelector("h3 a")?.textContent?.trim() || "";
    return {
      name,
      html: card.outerHTML,
      baseText: card.textContent.toLowerCase()
    };
  });

  function grantSearchText(name) {
    const signal = grantSignals[name];
    if (!signal) return "";
    const counts = signal.countRecent;
    return [
      "funding signals 基金信号",
      `NSF ${counts.nsf}`,
      `ARC ${counts.arc}`,
      `ERC ${counts.erc}`,
      signal.expirySummary,
      signal.note,
      signal.sources.map((source) => `${source.label} ${source.name}`).join(" ")
    ].join(" ").toLowerCase();
  }

  function contactSearchText(name) {
    const contact = contactSignals[name];
    if (!contact) return "";
    return [
      "contact 联系方式 email phone",
      contact.email,
      contact.phone,
      contact.source
    ].join(" ").toLowerCase();
  }

  function renderContactLine(name) {
    const contact = contactSignals[name];
    if (!contact) return "";
    const phone = contact.phone ? `<span class="contact-phone">${contact.phone}</span>` : "";
    return `
      <div class="contact-line" data-contact-for="${name}">
        <a href="mailto:${contact.email}">${contact.email}</a>
        ${phone}
        <span class="contact-source">${contact.source}</span>
      </div>
    `;
  }

  function badge(label, count) {
    const emptyClass = count === 0 ? " empty" : "";
    return `<span class="funding-badge${emptyClass}">${label} ${count}</span>`;
  }

  function renderFundingPanel(name) {
    const signal = grantSignals[name];
    if (!signal) return "";
    const counts = signal.countRecent;
    const panelId = `funding-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
    const sourceLinks = signal.sources.map((source) => (
      `<a class="funding-link" href="${source.url}" target="_blank" rel="noreferrer">${source.label} source</a>`
    )).join("");

    return `
      <details class="funding-panel" data-funding-for="${name}">
        <summary class="funding-summary" aria-controls="${panelId}">
          <span class="funding-title">Funding signals / 基金信号</span>
          <span class="funding-summary-counts">NSF ${counts.nsf} · ARC ${counts.arc} · ERC ${counts.erc}</span>
          <span class="funding-window">Recent public awards checked: ${recentWindow}</span>
        </summary>
        <div class="funding-drawer" id="${panelId}">
          <div class="funding-badges">
            ${badge("NSF", counts.nsf)}
            ${badge("ARC", counts.arc)}
            ${badge("ERC", counts.erc)}
          </div>
          <p class="funding-empty">No NSF/ARC/ERC public award found / 未找到 NSF/ARC/ERC 公开项目记录。</p>
          <p class="funding-note">${signal.expirySummary}</p>
          <p class="funding-note">${signal.note}</p>
          <div class="funding-links">${sourceLinks}</div>
          <p class="funding-note">Checked / 核查日期: ${signal.checkedDate}</p>
        </div>
      </details>
    `;
  }

  function enhanceFundingPanels() {
    supervisorList.querySelectorAll(".supervisor").forEach((card) => {
      const name = card.querySelector("h3 a")?.textContent?.trim();
      if (!name) return;
      if (!card.querySelector(".contact-line")) {
        card.querySelector("h3")?.insertAdjacentHTML("afterend", renderContactLine(name));
      }
      if (!card.querySelector(".funding-panel")) {
        card.insertAdjacentHTML("beforeend", renderFundingPanel(name));
      }
    });
  }

  function renderEnhancedSearch() {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
      supervisorList.innerHTML = supervisorCache.map((person) => person.html).join("");
      enhanceFundingPanels();
      return;
    }

    const filtered = supervisorCache.filter((person) => {
      const searchable = `${person.baseText} ${contactSearchText(person.name)} ${grantSearchText(person.name)}`;
      return searchable.includes(query);
    });

    supervisorList.innerHTML = filtered.map((person) => person.html).join("");
    enhanceFundingPanels();
  }

  searchInput.addEventListener("input", renderEnhancedSearch);
  enhanceFundingPanels();
})();
