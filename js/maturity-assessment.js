/* =============================================
   MATURITY ASSESSMENT — Interactive Client-Side
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  const assessment = document.getElementById('assessment');
  if (!assessment) return;

  const sections = [
    {
      id: 'strategy',
      title: 'Strategy & Governance',
      questions: [
        { q: 'How well-defined is your digital procurement strategy?', options: ['No strategy in place', 'Informal / ad-hoc', 'Documented but not widely followed', 'Clear strategy aligned with business goals'] },
        { q: 'How is procurement technology governed in your organization?', options: ['No governance structure', 'IT-led with minimal procurement input', 'Joint IT-procurement committee', 'Dedicated governance with executive sponsorship'] },
        { q: 'How aligned is your procurement technology roadmap with business objectives?', options: ['No roadmap exists', 'Roadmap exists but disconnected', 'Partially aligned', 'Fully aligned with measurable KPIs'] }
      ]
    },
    {
      id: 'technology',
      title: 'Technology Landscape',
      questions: [
        { q: 'How would you describe your current procurement technology stack?', options: ['Manual / spreadsheet-based', 'Fragmented point solutions', 'Partially integrated platform', 'Unified end-to-end platform'] },
        { q: 'How well are your procurement systems integrated with ERP/finance?', options: ['No integration', 'Manual data transfers', 'Partial API integration', 'Fully automated integration'] },
        { q: 'How current is your procurement technology?', options: ['Legacy systems (5+ years old)', 'Aging but functional', 'Recently upgraded', 'Modern cloud-native platform'] }
      ]
    },
    {
      id: 'process',
      title: 'Process Maturity',
      questions: [
        { q: 'How standardized are your procurement processes?', options: ['Ad-hoc, varies by team', 'Some documentation exists', 'Standardized across key areas', 'Fully standardized and continuously optimized'] },
        { q: 'What percentage of spend goes through your procurement system?', options: ['Less than 25%', '25-50%', '50-75%', 'Over 75%'] },
        { q: 'How do you measure procurement process performance?', options: ['No formal metrics', 'Basic reporting', 'Regular KPI dashboards', 'Real-time analytics with predictive insights'] }
      ]
    },
    {
      id: 'adoption',
      title: 'User Adoption',
      questions: [
        { q: 'What is your estimated user adoption rate for procurement tools?', options: ['Below 25%', '25-50%', '50-75%', 'Above 75%'] },
        { q: 'How do users perceive your procurement technology?', options: ['Actively avoided', 'Tolerated but disliked', 'Accepted but not valued', 'Valued and actively used'] },
        { q: 'What training and support is available for procurement tools?', options: ['No formal training', 'One-time training at launch', 'Periodic training sessions', 'Continuous learning with role-based content'] }
      ]
    },
    {
      id: 'data',
      title: 'Data & Analytics',
      questions: [
        { q: 'How would you rate the quality of your procurement data?', options: ['Poor — inconsistent and unreliable', 'Basic — some data available', 'Good — mostly accurate and complete', 'Excellent — clean, enriched, and trusted'] },
        { q: 'How do you leverage procurement data for decision-making?', options: ['Rarely used', 'Basic historical reporting', 'Regular analysis and dashboards', 'Predictive analytics and AI-driven insights'] },
        { q: 'How well do you manage spend classification and categorization?', options: ['No taxonomy', 'Basic categories', 'Detailed taxonomy', 'AI-enhanced auto-classification'] }
      ]
    },
    {
      id: 'supplier',
      title: 'Supplier Management',
      questions: [
        { q: 'How do you manage supplier information and relationships?', options: ['Spreadsheets / email', 'Basic supplier database', 'Dedicated SRM system', 'Integrated SRM with risk and performance scoring'] },
        { q: 'How do you assess and monitor supplier risk?', options: ['No risk assessment', 'Reactive / incident-based', 'Periodic risk reviews', 'Continuous automated risk monitoring'] },
        { q: 'How do you collaborate with strategic suppliers?', options: ['Minimal collaboration', 'Occasional meetings', 'Regular business reviews', 'Digital collaboration with shared KPIs'] }
      ]
    },
    {
      id: 'innovation',
      title: 'Innovation & AI Readiness',
      questions: [
        { q: 'How is your organization exploring AI in procurement?', options: ['Not on the radar', 'Awareness but no action', 'Piloting specific use cases', 'Active deployment of AI tools'] },
        { q: 'How innovative is your approach to procurement technology?', options: ['Resistant to change', 'Follower — adopt proven solutions', 'Early majority — open to new tech', 'Innovator — actively seeking cutting-edge solutions'] },
        { q: 'How do you stay informed about procurement technology trends?', options: ['We don\'t actively follow trends', 'Occasional vendor demos', 'Industry events and analyst reports', 'Active community participation and continuous scanning'] }
      ]
    }
  ];

  let currentSection = 0;
  let answers = {};

  function render() {
    if (currentSection < sections.length) {
      renderSection(sections[currentSection]);
    } else {
      renderResults();
    }
  }

  function renderSection(section) {
    const progress = ((currentSection) / sections.length) * 100;

    assessment.innerHTML = `
      <div class="assessment__progress">
        <div class="assessment__progress-bar" style="width:${progress}%"></div>
      </div>
      <div class="assessment__header">
        <span class="text-sm font-semibold color-accent text-uppercase" style="letter-spacing:0.1em;">
          Section ${currentSection + 1} of ${sections.length}
        </span>
        <h2 class="mt-2">${section.title}</h2>
      </div>
      <div class="assessment__questions">
        ${section.questions.map((q, qi) => `
          <div class="assessment__question">
            <p class="font-medium mb-4">${q.q}</p>
            <div class="assessment__options">
              ${q.options.map((opt, oi) => `
                <label class="assessment__option ${answers[section.id + '_' + qi] === oi ? 'assessment__option--selected' : ''}">
                  <input type="radio" name="${section.id}_${qi}" value="${oi}"
                    ${answers[section.id + '_' + qi] === oi ? 'checked' : ''}>
                  <span class="assessment__option-indicator">${oi + 1}</span>
                  <span>${opt}</span>
                </label>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
      <div class="assessment__nav">
        ${currentSection > 0 ? '<button class="btn btn--outline" id="prev-btn">Previous</button>' : '<div></div>'}
        <button class="btn btn--primary" id="next-btn" ${!isSectionComplete(section) ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : ''}>
          ${currentSection < sections.length - 1 ? 'Next Section' : 'View Results'}
        </button>
      </div>
    `;

    // Attach event listeners
    assessment.querySelectorAll('input[type="radio"]').forEach(input => {
      input.addEventListener('change', (e) => {
        const [sectionId, questionIndex] = e.target.name.split('_');
        answers[sectionId + '_' + questionIndex] = parseInt(e.target.value);
        // Update styling
        const questionDiv = e.target.closest('.assessment__question');
        questionDiv.querySelectorAll('.assessment__option').forEach(opt => opt.classList.remove('assessment__option--selected'));
        e.target.closest('.assessment__option').classList.add('assessment__option--selected');
        // Enable/disable next button
        const nextBtn = document.getElementById('next-btn');
        if (isSectionComplete(section)) {
          nextBtn.disabled = false;
          nextBtn.style.opacity = '1';
          nextBtn.style.cursor = 'pointer';
        }
      });
    });

    const nextBtn = document.getElementById('next-btn');
    nextBtn.addEventListener('click', () => {
      if (isSectionComplete(section)) {
        currentSection++;
        render();
        window.scrollTo({ top: assessment.offsetTop - 100, behavior: 'smooth' });
      }
    });

    const prevBtn = document.getElementById('prev-btn');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentSection--;
        render();
        window.scrollTo({ top: assessment.offsetTop - 100, behavior: 'smooth' });
      });
    }
  }

  function isSectionComplete(section) {
    return section.questions.every((_, qi) => answers[section.id + '_' + qi] !== undefined);
  }

  function renderResults() {
    const scores = sections.map(section => {
      let total = 0;
      section.questions.forEach((_, qi) => {
        total += answers[section.id + '_' + qi] || 0;
      });
      const maxScore = section.questions.length * 3;
      return {
        id: section.id,
        title: section.title,
        score: total,
        max: maxScore,
        percentage: Math.round((total / maxScore) * 100)
      };
    });

    const overallScore = scores.reduce((sum, s) => sum + s.percentage, 0) / scores.length;
    let maturityLevel, levelDescription;

    if (overallScore >= 75) {
      maturityLevel = 'Leader';
      levelDescription = 'Your organization demonstrates advanced procurement technology maturity. Focus on continuous optimization, AI integration, and innovation leadership.';
    } else if (overallScore >= 50) {
      maturityLevel = 'Progressing';
      levelDescription = 'You have a solid foundation in place. Key opportunities exist to deepen adoption, improve integration, and leverage advanced analytics.';
    } else if (overallScore >= 25) {
      maturityLevel = 'Developing';
      levelDescription = 'Your procurement technology journey is underway but significant gaps remain. Prioritize strategy alignment, system consolidation, and user adoption.';
    } else {
      maturityLevel = 'Emerging';
      levelDescription = 'Your organization is at the early stages of digital procurement. Start with a clear strategy, select the right platform, and build foundational processes.';
    }

    assessment.innerHTML = `
      <div class="assessment__progress">
        <div class="assessment__progress-bar" style="width:100%"></div>
      </div>
      <div class="assessment__results">
        <div class="text-center mb-12">
          <span class="section-header__label">Your Results</span>
          <h2 class="mt-4">Procurement Maturity Score</h2>
          <div class="assessment__overall-score">
            <span class="assessment__score-number">${Math.round(overallScore)}%</span>
            <span class="assessment__score-level">${maturityLevel}</span>
          </div>
          <p class="text-lg color-secondary mt-4 max-w-md mx-auto">${levelDescription}</p>
        </div>
        <div class="assessment__breakdown">
          <h3 class="mb-6">Score by Dimension</h3>
          ${scores.map(s => `
            <div class="assessment__dimension">
              <div class="assessment__dimension-header">
                <span class="font-medium">${s.title}</span>
                <span class="font-semibold color-accent">${s.percentage}%</span>
              </div>
              <div class="assessment__bar">
                <div class="assessment__bar-fill" style="width:${s.percentage}%;background:${s.percentage >= 75 ? 'var(--color-success)' : s.percentage >= 50 ? 'var(--color-accent-500)' : s.percentage >= 25 ? 'var(--color-signal-500)' : 'var(--color-error)'}"></div>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="text-center mt-12">
          <h3 class="mb-4">Want to discuss your results?</h3>
          <p class="color-secondary mb-6">Our experts can help you build a roadmap based on your specific scores and priorities.</p>
          <div class="flex flex--center flex--gap-md flex--wrap">
            <a href="/contact.html" class="btn btn--primary btn--lg">Discuss with an Expert</a>
            <button class="btn btn--outline btn--lg" onclick="location.reload()">Retake Assessment</button>
          </div>
        </div>
      </div>
    `;
  }

  render();
});
