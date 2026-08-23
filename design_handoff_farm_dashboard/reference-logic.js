/*
 * The Farm — Progress Dashboard :: reference logic
 * Verbatim copy of the design prototype's component class.
 * NOT production code — it is a single class with inline style-string builders,
 * written for a streaming HTML preview runtime. Read it to recover exact
 * conditional styling, geometry math (SVG charts), and event behavior,
 * then re-implement idiomatically in your framework.
 */

class Component extends DCLogic {
  state = { view: 'now', month: 'July', horizon: '30 Days', openCall: 0, filter: 'All', hoverDay: null, hoverSlice: null, flipped: {}, done: {}, query: '', compare: 'week', collapsed: false, logMode: 'list', calIdx: 1, assigned: {}, openAssign: null, addingTask: false, tDraft: { title: '', who: 'kristie', due: '' }, extraTasks: [], igTab: 'Grid', ccType: 'All types', ccOpen: null, ccDates: {}, ccDrag: null, ccOver: null, ccApprover: {}, ccApproved: {}, ccNotes: {}, ccDraft: '' };

  navStyle(active) {
    const c = this.state.collapsed;
    if (c) return 'display:flex;align-items:center;justify-content:center;padding:11px 0;border-radius:8px;text-decoration:none;font:700 11px/1 var(--font-sans);letter-spacing:.04em;color:' +
      (active ? 'var(--ivory)' : 'rgba(216,203,190,.72)') + ';background:' + (active ? 'var(--maroon)' : 'transparent');
    return 'display:flex;align-items:center;gap:11px;padding:10px ' + (c ? '0' : '10px') + ';border-radius:8px;text-decoration:none;overflow:hidden;white-space:nowrap;' +
      (c ? 'justify-content:center;' : '') +
      'font:' + (active ? '700' : '400') + ' 13px/1.3 var(--font-sans);color:' +
      (active ? 'var(--ivory)' : 'rgba(247,242,234,.62)') + ';background:' +
      (active ? 'rgba(216,203,190,.16)' : 'transparent');
  }
  rail() {
    const c = this.state.collapsed;
    return {
      aside: 'width:' + (c ? '68px' : '244px') + ';flex:none;background:var(--ink);display:flex;flex-direction:column;padding:' + (c ? '22px 12px' : '22px 18px') + ';position:sticky;top:0;height:100vh;transition:width .22s ease',
      brand: 'display:flex;' + (c ? 'flex-direction:column;align-items:center;gap:12px;' : 'align-items:center;gap:8px;') + 'padding:0 ' + (c ? '0' : '8px') + ' 18px;border-bottom:1px solid rgba(216,203,190,.18)',
      wordmark: 'display:flex;align-items:baseline;gap:6px;min-width:0;text-decoration:none;' + (c ? '' : 'flex:1'),
      mark: c ? 'F' : 'The Farm',
      script: c ? 'display:none' : 'font:400 14px/1 var(--font-script);color:var(--beige)',
      toggleStyle: 'width:' + (c ? '30px' : '24px') + ';height:' + (c ? '30px' : '24px') + ';flex:none;border-radius:' + (c ? '999px' : '6px') + ';display:flex;align-items:center;justify-content:center;background:rgba(216,203,190,.14);color:var(--beige);font-size:' + (c ? '14px' : '11px') + ';text-decoration:none',
      caret: c ? '›' : '‹',
      toggleTitle: c ? 'Expand navigation' : 'Collapse navigation',
      labelStyle: c ? 'display:none' : 'display:block;overflow:hidden;text-overflow:ellipsis',
      numStyle: c ? 'font:inherit' : 'font:700 9px/1 var(--font-sans);letter-spacing:.08em;opacity:.5;width:14px;flex:none;text-align:center',
      libBtn: 'display:block;text-align:center;padding:11px ' + (c ? '0' : '14px') + ';border-radius:999px;background:var(--beige);color:var(--ink);font:700 ' + (c ? '13px' : '9.5px') + '/1 var(--font-sans);letter-spacing:' + (c ? '0' : '.14em') + ';text-transform:uppercase;text-decoration:none',
      libLabel: c ? '↗' : 'Open Library ↗',
      meta: c ? 'display:none' : 'padding:0 8px;font:400 11px/1.5 var(--font-sans);color:rgba(216,203,190,.45)',
      toggle: e => { e.preventDefault(); this.setState(s => ({ collapsed: !s.collapsed })); }
    };
  }
  pillStyle(active) {
    return 'padding:8px 16px;border-radius:999px;font:700 10px/1 var(--font-sans);letter-spacing:.12em;text-transform:uppercase;text-decoration:none;background:' +
      (active ? 'var(--ink)' : 'transparent') + ';color:' + (active ? 'var(--ivory)' : 'var(--ink-soft)');
  }
  chipStyle(active) {
    return 'padding:8px 15px;border-radius:999px;font:700 10px/1 var(--font-sans);letter-spacing:.1em;text-transform:uppercase;text-decoration:none;border:1px solid ' +
      (active ? 'var(--maroon)' : 'var(--beige)') + ';background:' + (active ? 'var(--maroon)' : 'transparent') +
      ';color:' + (active ? 'var(--ivory)' : 'var(--ink-soft)');
  }

  svgText(x, y, str, style, key) {
    return React.createElement('text', { key, x, y, textAnchor: 'middle', style }, str);
  }
  avatar(p, size) {
    return 'width:' + size + 'px;height:' + size + 'px;flex:none;border-radius:999px;display:flex;align-items:center;justify-content:center;font:700 8.5px/1 var(--font-sans);letter-spacing:.04em;color:#fff;background:' + p.color;
  }
  tasks() {
    const st = this.state;
    const all = TASKS.concat(st.extraTasks);
    const doneCount = all.filter(t => st.done[t.key]).length;
    const d = st.tDraft;
    return {
      progress: doneCount + ' of ' + all.length + ' done',
      barStyle: 'height:100%;border-radius:999px;background:var(--sage);width:' + ((doneCount / all.length) * 100).toFixed(0) + '%;transition:width .2s',
      addLabel: st.addingTask ? 'Cancel' : '+ Add task',
      toggleAdd: e => { e.preventDefault(); this.setState(s => ({ addingTask: !s.addingTask })); },
      addRowStyle: st.addingTask
        ? 'display:grid;grid-template-columns:26px 1fr 190px 92px;gap:14px;align-items:center;padding:12px 2px;border-bottom:1px solid var(--ivory);background:var(--parchment)'
        : 'display:none',
      people: PEOPLE,
      draftTitle: d.title, draftWho: d.who, draftDue: d.due,
      setTitle: e => { const v = e.target.value; this.setState(s => ({ tDraft: { ...s.tDraft, title: v } })); },
      setWho: e => { const v = e.target.value; this.setState(s => ({ tDraft: { ...s.tDraft, who: v } })); },
      setDue: e => { const v = e.target.value; this.setState(s => ({ tDraft: { ...s.tDraft, due: v } })); },
      addBtnStyle: 'width:28px;height:28px;flex:none;border-radius:7px;display:flex;align-items:center;justify-content:center;text-decoration:none;font:700 14px/1 var(--font-sans);background:' +
        (d.title.trim() ? 'var(--maroon)' : 'var(--beige)') + ';color:' + (d.title.trim() ? 'var(--ivory)' : 'var(--ink-soft)'),
      add: e => {
        e.preventDefault();
        const t = st.tDraft;
        if (!t.title.trim()) return;
        this.setState(s => ({
          extraTasks: s.extraTasks.concat([{ key: 'x' + Date.now(), title: t.title.trim(), who: t.who, due: t.due.trim() || 'No date' }]),
          tDraft: { title: '', who: 'kristie', due: '' }
        }));
      },
      rows: all.map((t, i) => {
        const d = !!st.done[t.key];
        const p = PEOPLE.find(x => x.id === (st.assigned[t.key] || t.who));
        const open = st.openAssign === i;
        return {
          title: t.title, due: t.due, who: p.name, initials: p.initials, mark: d ? '✓' : '',
          boxStyle: 'width:20px;height:20px;border-radius:5px;display:flex;align-items:center;justify-content:center;text-decoration:none;font:700 11px/1 var(--font-sans);border:1.5px solid ' +
            (d ? 'var(--sage)' : 'var(--beige-deep)') + ';background:' + (d ? 'var(--sage)' : '#fff') + ';color:#fff',
          textStyle: 'font:400 14.5px/1.4 var(--font-sans);color:var(--ink)' + (d ? ';text-decoration:line-through;opacity:.45' : ''),
          chipStyle: 'display:flex;align-items:center;gap:8px;padding:6px 10px;border-radius:999px;border:1px solid var(--beige);text-decoration:none;background:#fff',
          avatarStyle: this.avatar(p, 22),
          dueStyle: 'font:700 9.5px/1 var(--font-sans);letter-spacing:.1em;text-transform:uppercase;color:' + (d ? 'var(--ink-faint)' : 'var(--maroon)'),
          toggle: e => { e.preventDefault(); this.setState(s => ({ done: { ...s.done, [t.key]: !s.done[t.key] } })); },
          openMenu: e => { e.preventDefault(); this.setState(s => ({ openAssign: s.openAssign === i ? null : i })); },
          menuStyle: open
            ? 'display:flex;flex-direction:column;position:absolute;z-index:10;top:calc(100% + 6px);left:0;width:190px;padding:6px;background:#fff;border:1px solid var(--beige);border-radius:10px;box-shadow:0 6px 18px rgba(46,38,34,.14)'
            : 'display:none',
          options: PEOPLE.map(o => ({
            name: o.name, initials: o.initials,
            avatarStyle: this.avatar(o, 20),
            style: 'display:flex;align-items:center;gap:9px;padding:7px 8px;border-radius:7px;text-decoration:none;background:' + (o.id === p.id ? 'var(--maroon-tint)' : 'transparent'),
            pick: e => { e.preventDefault(); this.setState(s => ({ assigned: { ...s.assigned, [t.key]: o.id }, openAssign: null })); }
          }))
        };
      })
    };
  }

  ccModal() {
    const st = this.state;
    const i = st.ccOpen;
    if (i == null) return { overlay: 'display:none', notes: [], approvers: [], hasNotes: false, noNotes: 'display:none' };
    const p = POSTS[i];
    const approver = st.ccApprover[i] || '';
    const approved = !!st.ccApproved[i];
    const notes = st.ccNotes[i] || [];
    return {
      overlay: 'position:fixed;inset:0;z-index:60;background:rgba(46,38,34,.55);display:flex;align-items:flex-start;justify-content:center;padding:44px 24px;overflow:auto',
      close: e => { e.preventDefault(); this.setState({ ccOpen: null }); },
      stop: e => e.stopPropagation(),
      img: 'height:190px;background-image:url(' + p.img + ');background-size:cover;background-position:center',
      type: p.type.toUpperCase(),
      typeStyle: 'font:700 8.5px/1 var(--font-sans);letter-spacing:.14em;padding:6px 11px;border-radius:999px;color:#fff;background:' + TYPE_COLOR[p.type],
      title: p.title,
      caption: p.caption,
      when: (st.ccDates[i] || p.date) + ', 2026 · ' + p.time,
      meta: [
        { k: 'Format', v: p.type },
        { k: 'Angle', v: p.angle },
        { k: 'Owner', v: p.owner },
        { k: 'Status', v: approved ? 'Approved' : p.status }
      ],
      statusStyle: 'display:inline-flex;align-items:center;gap:7px;padding:7px 13px;border-radius:999px;font:700 9.5px/1 var(--font-sans);letter-spacing:.12em;text-transform:uppercase;background:' +
        (approved ? 'rgba(111,115,85,.14)' : 'var(--maroon-tint)') + ';color:' + (approved ? 'var(--sage-deep)' : 'var(--maroon)'),
      statusLabel: approved ? '✓ Approved by ' + (approver || 'the team') : 'Awaiting approval',
      approver,
      approverOptions: [{ value: '', label: 'Select approver…' }].concat(PEOPLE.map(x => ({ value: x.name, label: x.name }))),
      setApprover: e => { const v = e.target.value; this.setState(s => ({ ccApprover: { ...s.ccApprover, [i]: v } })); },
      approveStyle: 'padding:12px 20px;border-radius:6px;font:700 10px/1 var(--font-sans);letter-spacing:.14em;text-transform:uppercase;text-decoration:none;background:' +
        (approved ? 'var(--cream)' : approver ? 'var(--maroon)' : 'var(--beige)') + ';color:' + (approved || !approver ? 'var(--ink-soft)' : 'var(--ivory)'),
      approveLabel: approved ? 'Undo approval' : 'Approve post',
      approve: e => {
        e.preventDefault();
        if (!approved && !approver) return;
        this.setState(s => ({ ccApproved: { ...s.ccApproved, [i]: !approved } }));
      },
      notes,
      hasNotes: notes.length > 0,
      noNotes: notes.length ? 'display:none' : 'display:block;font:400 13px/1.5 var(--font-sans);color:var(--ink-faint)',
      draft: st.ccDraft,
      setDraft: e => this.setState({ ccDraft: e.target.value }),
      addNote: e => {
        e.preventDefault();
        const text = st.ccDraft.trim();
        if (!text) return;
        const who = approver || 'You';
        this.setState(s => ({
          ccNotes: { ...s.ccNotes, [i]: (s.ccNotes[i] || []).concat([{ who, text, when: 'just now' }]) },
          ccDraft: ''
        }));
      }
    };
  }

  contentCal() {
    const st = this.state;
    const TYPES = ['All types', 'Reels', 'Carousels', 'Stories', 'Feed'];
    const map = { Reels: 'Reel', Carousels: 'Carousel', Stories: 'Story', Feed: 'Feed' };
    const want = map[st.ccType];
    const dateOf = i => st.ccDates[i] || POSTS[i].date;
    const byDate = {};
    POSTS.forEach((p, i) => { byDate[dateOf(i)] = { p: p, i: i }; });
    const dragging = st.ccDrag != null;

    const startY = 2026, startM = 7, startD = 19;   // Mon Aug 19, 2026
    const MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const weeks = [];
    for (let w = 0; w < 3; w++) {
      const cells = [];
      for (let i = 0; i < 7; i++) {
        const dt = new Date(startY, startM, startD + w * 7 + i);
        const key = MON[dt.getMonth()] + ' ' + dt.getDate();
        const hit = byDate[key];
        const p = hit ? hit.p : null;
        const pi = hit ? hit.i : null;
        const isOver = st.ccOver === key;
        const canDrop = dragging && (!p || pi === st.ccDrag);
        const dimmed = p && want && p.type !== want;
        const firstOfMonth = dt.getDate() === 1;
        cells.push({
          dayLabel: firstOfMonth ? MON[dt.getMonth()] + ' 1' : String(dt.getDate()),
          dayStyle: 'font:' + (p ? '700' : '400') + ' 11px/1 var(--font-sans);color:' + (p ? 'var(--ink)' : 'var(--ink-faint)'),
          cellStyle: 'min-width:0;min-height:150px;padding:9px 8px;border-right:1px solid var(--cream);border-bottom:1px solid var(--cream);transition:background .12s;background:' +
            (isOver && canDrop ? 'var(--maroon-tint)' : canDrop ? 'rgba(216,203,190,.28)' : p ? '#fff' : 'var(--ivory)') +
            (canDrop ? ';outline:1px dashed var(--beige-deep);outline-offset:-3px' : ''),
          over: e => { if (!dragging) return; e.preventDefault(); if (st.ccOver !== key) this.setState({ ccOver: key }); },
          drop: e => {
            e.preventDefault();
            if (st.ccDrag == null || !canDrop) { this.setState({ ccDrag: null, ccOver: null }); return; }
            const i = st.ccDrag;
            this.setState(s => ({ ccDates: { ...s.ccDates, [i]: key }, ccDrag: null, ccOver: null }));
          },
          hasPost: !!p,
          cardStyle: p
            ? 'display:block;text-decoration:none;border:1px solid var(--beige);border-radius:10px;overflow:hidden;background:#fff;margin-top:7px;cursor:grab;box-shadow:0 2px 8px rgba(46,38,34,.07);opacity:' +
              (st.ccDrag === pi ? '.4' : dimmed ? '.28' : '1') + ';border-left:3px solid ' + TYPE_COLOR[p.type]
            : 'display:none',
          draggable: !!p,
          dragStart: p ? (e => { this.setState({ ccDrag: pi, ccOver: null }); }) : null,
          dragEnd: p ? (() => this.setState({ ccDrag: null, ccOver: null })) : null,
          type: p ? p.type.toUpperCase() : '',
          typeStyle: p ? 'font:700 8px/1 var(--font-sans);letter-spacing:.12em;color:' + TYPE_COLOR[p.type] : '',
          statusDot: p ? 'width:7px;height:7px;border-radius:999px;flex:none;background:' + STATUS_COLOR[p.status] : '',
          title: p ? p.title : '',
          img: p ? 'height:52px;background-image:url(' + p.img + ');background-size:cover;background-position:center' : '',
          angle: p ? p.angle.toUpperCase() : '',
          owner: p ? p.owner.toUpperCase() : '',
          tip: p ? p.status + ' · ' + p.owner + ' — drag to reschedule' : '',
          open: p ? (e => { e.preventDefault(); this.setState({ ccOpen: POSTS.indexOf(p), ccDraft: '' }); }) : (e => e.preventDefault())
        });
      }
      weeks.push({ cells });
    }
    return {
      types: TYPES.map(t => ({ label: t.toUpperCase(), style: this.chipStyle(st.ccType === t),
        go: e => { e.preventDefault(); this.setState({ ccType: t }); } })),
      dows: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      weeks,
      planned: POSTS.length,
      movedNote: Object.keys(st.ccDates).length
        ? Object.keys(st.ccDates).length + ' rescheduled — push the changes in GHL'
        : 'Drag any post to another day to reschedule it.',
      needApproval: POSTS.filter(p => p.status === 'In review').length,
      typeLegend: Object.keys(TYPE_COLOR).map(t => ({ label: t.toUpperCase(), dot: 'width:8px;height:8px;border-radius:2px;background:' + TYPE_COLOR[t] })),
      statusLegend: Object.keys(STATUS_COLOR).map(s => ({ label: s, dot: 'width:7px;height:7px;border-radius:999px;background:' + STATUS_COLOR[s] }))
    };
  }

  calendar(feed) {
    const MONTHS_META = [
      { key: 'Jul', title: 'July 2026', year: 2026, m: 6 },
      { key: 'Aug', title: 'August 2026', year: 2026, m: 7 }
    ];
    const idx = Math.max(0, Math.min(MONTHS_META.length - 1, this.state.calIdx));
    const meta = MONTHS_META[idx];
    const first = new Date(meta.year, meta.m, 1).getDay();
    const days = new Date(meta.year, meta.m + 1, 0).getDate();
    const byDay = {};
    feed.filter(it => it.date.startsWith(meta.key)).forEach(it => {
      const d = parseInt(it.date.split(' ')[1], 10);
      (byDay[d] = byDay[d] || []).push(it);
    });
    const cells = [];
    for (let i = 0; i < first; i++) cells.push({ day: '', items: [], blank: true });
    for (let d = 1; d <= days; d++) cells.push({ day: d, items: byDay[d] || [], blank: false });
    while (cells.length % 7) cells.push({ day: '', items: [], blank: true });
    const today = meta.key === 'Aug' ? 22 : null;
    return {
      title: meta.title,
      dows: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      legend: Object.keys(KIND_COLOR).map(k => ({ kind: k, dot: 'width:8px;height:8px;border-radius:2px;background:' + KIND_COLOR[k] })),
      prev: e => { e.preventDefault(); this.setState({ calIdx: Math.max(0, idx - 1) }); },
      next: e => { e.preventDefault(); this.setState({ calIdx: Math.min(MONTHS_META.length - 1, idx + 1) }); },
      cells: cells.map(c => {
        const isToday = c.day === today;
        return {
          day: c.day,
          style: 'min-width:0;min-height:96px;padding:7px 7px 8px;border-radius:8px;overflow:hidden;background:' +
            (c.blank ? 'transparent' : isToday ? 'var(--maroon-tint)' : 'var(--ivory)') +
            ';border:1px solid ' + (isToday ? 'var(--maroon)' : c.blank ? 'transparent' : 'var(--cream)'),
          numStyle: 'font:' + (isToday ? '700' : '400') + ' 11px/1 var(--font-sans);color:' + (isToday ? 'var(--maroon)' : 'var(--ink-faint)'),
          items: c.items.map(it => ({
            title: it.kind + ' — ' + it.title,
            short: it.title,
            chipStyle: 'display:block;font:400 10px/1.4 var(--font-sans);padding:4px 7px;border-radius:5px;text-decoration:none;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;background:' + (KIND_COLOR[it.kind] || '#8B7F73'),
            go: e => { e.preventDefault(); this.setState({ view: it.view }); }
          }))
        };
      })
    };
  }

  chart() {
    const max = 450, x0 = 40, w = 560, top = 30, bot = 196;
    const y = v => bot - (v / max) * (bot - top);
    const pts = DAYS.map((d, i) => {
      const cx = x0 + (i * w) / (DAYS.length - 1);
      const hov = this.state.hoverDay === i;
      return { x: cx.toFixed(1), y: y(d.v).toFixed(1), r: hov ? 6 : 4, fill: hov ? '#6C1E27' : '#fff', label: d.label, v: d.v,
        enter: () => this.setState({ hoverDay: i }), leave: () => this.setState({ hoverDay: null }) };
    });
    return {
      pts,
      labels: React.createElement('g', { key: 'daylabels' }, pts.map((p, i) =>
        this.svgText(parseFloat(p.x), 214, p.label, { font: '400 10px var(--font-sans)', fill: '#8B7F73' }, 'd' + i))),
      line: pts.map(p => p.x + ',' + p.y).join(' '),
      area: pts.map(p => p.x + ',' + p.y).join(' ') + ' 600,196 40,196',
      yBase: y(25).toFixed(1), yBaseT: (y(25) - 5).toFixed(1),
      yPace: y(152).toFixed(1), yPaceT: (y(152) - 5).toFixed(1)
    };
  }

  renderVals() {
    const st = this.state;
    const md = MONTHS[st.month];
    const chart = this.chart();
    const hd = st.hoverDay;
    const hp = hd == null ? null : chart.pts[hd];

    const total = DONUT.reduce((a, d) => a + d.value, 0);
    const C = 2 * Math.PI * 46;
    let acc = 0;
    const donut = DONUT.map((d, i) => {
      const len = (d.value / total) * C;
      const off = -acc;
      acc += len;
      const hov = st.hoverSlice === i;
      return {
        label: d.label, value: d.value, color: d.color,
        w: hov ? 18 : 13, dash: len.toFixed(2) + ' ' + (C - len).toFixed(2), offset: off.toFixed(2),
        rowStyle: 'display:flex;align-items:center;gap:9px;padding:4px 6px;border-radius:6px;cursor:pointer;background:' + (hov ? 'var(--ivory)' : 'transparent'),
        swatchStyle: 'width:9px;height:9px;border-radius:2px;flex:none;background:' + d.color,
        enter: () => this.setState({ hoverSlice: i }), leave: () => this.setState({ hoverSlice: null })
      };
    });
    const hs = st.hoverSlice == null ? null : DONUT[st.hoverSlice];

    const filtered = st.filter === 'All' ? LIB : LIB.filter(l => l.tag === st.filter);

    const feed = FEED;

    const sparkMax = 450;
    const spark = DAYS.map((d, i) => (i * 260 / 6).toFixed(1) + ',' + (42 - (d.v / sparkMax) * 40).toFixed(1)).join(' ');

    return {
      rail: this.rail(),
      navItems: NAV.map(n => ({ ...n, style: this.navStyle(st.view === n.id), go: e => { e.preventDefault(); this.setState({ view: n.id }); } })),
      isNow: st.view === 'now', isBeen: st.view === 'been', isAre: st.view === 'are',
      isGoing: st.view === 'going', isCalendar: st.view === 'calendar', isLibrary: st.view === 'library', isToolkit: st.view === 'toolkit',

      spark,
      heroMetrics: HERO.map((m, i) => {
        const f = !!st.flipped[i];
        return { ...m, chip: m.week,
          cardStyle: 'background:#fff;border:1px solid var(--beige);border-radius:14px;padding:18px 20px;box-shadow:0 2px 8px rgba(46,38,34,.07);cursor:pointer;min-height:150px;display:flex;flex-direction:column',
          faceStyle: f ? 'display:none' : 'display:block',
          whyStyle: f ? 'display:block;font:400 13px/1.55 var(--font-sans);color:var(--ink-soft);margin-top:12px' : 'display:none',
          flip: () => this.setState(s => ({ flipped: { ...s.flipped, [i]: !s.flipped[i] } })) };
      }),
      heroChip: '+180% week over week',
      feed: feed.map(it => ({ ...it,
        kindStyle: 'font:700 8.5px/1 var(--font-sans);letter-spacing:.12em;text-transform:uppercase;padding:5px 9px;border-radius:999px;text-align:center;white-space:nowrap;color:#fff;background:' + (KIND_COLOR[it.kind] || '#8B7F73'),
        go: e => { e.preventDefault(); this.setState({ view: it.view }); } })),
      feedCount: FEED.length + ' entries · newest first',
      goHome: e => { e.preventDefault(); this.setState({ view: 'now' }); },
      logModes: [{ id: 'list', label: 'List' }, { id: 'calendar', label: 'Month' }].map(m => ({
        label: m.label, style: this.pillStyle(st.logMode === m.id),
        go: e => { e.preventDefault(); this.setState({ logMode: m.id }); }
      })),
      listWrap: st.logMode === 'list' ? 'display:block' : 'display:none',
      calWrap: st.logMode === 'calendar' ? 'display:block' : 'display:none',
      cal: this.calendar(feed),
      logGrid: 'display:block',
      asks: [
        { key: 'jjg', title: 'Introduction to JJG', who: 'Kristie' },
        { key: 'ac', title: 'Claude ↔ ActiveCampaign connector', who: 'Kristie · JJG — admin access' }
      ].map(a => {
        const d = !!st.done[a.key];
        return { ...a, mark: d ? '✓' : '',
          rowStyle: 'display:flex;gap:12px;align-items:flex-start;padding:11px 10px;border-radius:8px;cursor:pointer',
          boxStyle: 'width:18px;height:18px;flex:none;border-radius:4px;border:1px solid ' + (d ? 'var(--sage)' : 'var(--beige-deep)') + ';background:' + (d ? 'var(--sage)' : '#fff') + ';color:#fff;font:700 11px/17px var(--font-sans);text-align:center;margin-top:1px',
          textStyle: 'font:400 14px/1.4 var(--font-sans);color:var(--ink)' + (d ? ';text-decoration:line-through;opacity:.5' : ''),
          toggle: () => this.setState(s => ({ done: { ...s.done, [a.key]: !s.done[a.key] } })) };
      }),
      tasks: this.tasks(),

      months: Object.keys(MONTHS).map(m => ({ label: m, style: this.pillStyle(st.month === m), go: e => { e.preventDefault(); this.setState({ month: m, openCall: 0 }); } })),
      monthNote: md.note,
      baseline: BASELINE,
      calls: md.calls.map((c, i) => {
        const open = st.openCall === i;
        return { ...c,
          caretStyle: 'font-size:11px;color:var(--ink-faint);flex:none;transition:transform .15s;transform:rotate(' + (open ? '180deg' : '0deg') + ')',
          bodyStyle: open ? 'display:block;padding:0 22px 20px 86px;border-top:1px solid var(--ivory);padding-top:16px' : 'display:none',
          toggle: () => this.setState(s => ({ openCall: s.openCall === i ? -1 : i })) };
      }),
      shipped: md.shipped,

      chart, tip: {
        style: hp
          ? 'position:absolute;pointer-events:none;left:' + ((hp.x / 620) * 100).toFixed(2) + '%;top:' + ((hp.y / 220) * 100).toFixed(2) + '%;transform:translate(-50%,-128%);background:var(--ink);color:var(--ivory);padding:9px 13px;border-radius:8px;text-align:center;white-space:nowrap'
          : 'display:none',
        value: hp ? hp.v : '', label: hp ? hp.label + ' · reached' : ''
      },
      scoreboard: SCOREBOARD,
      igAvatar: 'width:100%;height:100%;border-radius:999px;border:2px solid #fff;background-image:url(assets/pavilion-autumn.jpg);background-size:cover;background-position:center',
      igStats: [{ value: '38', label: 'posts' }, { value: '4,694', label: 'followers' }, { value: '812', label: 'following' }],
      igTabs: Object.keys(IG_POSTS).map(t => ({
        label: t,
        style: 'flex:1;text-align:center;padding:10px 0;text-decoration:none;font:700 9px/1 var(--font-sans);letter-spacing:.12em;text-transform:uppercase;color:' +
          (st.igTab === t ? 'var(--ink)' : 'var(--ink-faint)') + ';border-bottom:2px solid ' + (st.igTab === t ? 'var(--ink)' : 'transparent'),
        go: e => { e.preventDefault(); this.setState({ igTab: t }); }
      })),
      igGrid: IG_POSTS[st.igTab].map(p => ({
        bg: 'position:absolute;inset:0;background-image:url(' + p.img + ');background-size:cover;background-position:center',
        badge: p.badge,
        badgeStyle: p.badge ? 'position:absolute;top:5px;right:6px;font-size:9px;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,.5)' : 'display:none',
        metric: p.metric,
        metricStyle: 'position:absolute;bottom:4px;left:5px;font:700 8.5px/1 var(--font-sans);color:#fff;text-shadow:0 1px 3px rgba(0,0,0,.6)'
      })),
      donut,
      donutLabels: React.createElement('g', { key: 'donutlabels' }, [
        this.svgText(60, 58, hs ? String(hs.value) : String(total), { font: '400 22px var(--font-serif)', fill: '#2E2622' }, 'dc'),
        this.svgText(60, 72, hs ? hs.label.split(' ')[0].toUpperCase() : 'INTERACTIONS', { font: '700 7px var(--font-sans)', letterSpacing: '.14em', fill: '#8B7F73' }, 'dl')
      ]),

      horizons: Object.keys(HORIZONS).map(h => ({ label: h, style: this.pillStyle(st.horizon === h), go: e => { e.preventDefault(); this.setState({ horizon: h }); } })),
      horizon: HORIZONS[st.horizon],
      goalBars: HORIZONS[st.horizon].goals.map(g => {
        const pct = Math.max(3, Math.min(100, (g.now / g.goal) * 100));
        return { t: g.t, d: g.d,
          readout: g.now.toLocaleString() + ' → ' + g.goal.toLocaleString() + ' ' + g.unit,
          barStyle: 'height:100%;border-radius:999px;background:var(--maroon);width:' + pct.toFixed(1) + '%' };
      }),
      motionBars: IN_MOTION.map(m => ({ label: m.label, pct: m.pct + '%',
        barStyle: 'height:100%;border-radius:999px;background:var(--sage);width:' + m.pct + '%' })),
      traj: (() => {
        const max = 1000, x0 = 52, w = 828, top = 40, bot = 252;
        const y = v => bot - (v / max) * (bot - top);
        const pts = TRAJECTORY.map((t, i) => {
          const x = x0 + (i * w) / (TRAJECTORY.length - 1);
          const active = t.label === st.horizon;
          return { ...t, xn: x, yn: y(t.value), x: x.toFixed(1), y: y(t.value).toFixed(1),
            r: active ? 8 : t.kind === 'actual' ? 6 : 5,
            sw: active ? 3 : 2.5,
            fill: t.kind === 'projection' ? '#6F7355' : (active || t.kind === 'actual') ? '#6C1E27' : '#fff',
            active,
            stroke: t.kind === 'projection' ? '#6F7355' : '#6C1E27',
            vy: (y(t.value) - 16).toFixed(1),
            value: t.value.toLocaleString(),
            valueStyle: 'font:400 ' + (active ? '17px' : '14px') + ' var(--font-serif);fill:#6C1E27',
            labelStyle: 'font:700 ' + (active ? '10.5px' : '9.5px') + ' var(--font-sans);letter-spacing:.1em;text-transform:uppercase;fill:' + (active ? '#6C1E27' : '#2E2622'),
            go: () => { if (HORIZONS[t.label]) this.setState({ horizon: t.label }); } };
        });
        const actual = pts.filter(p => p.kind === 'actual');
        const proj = pts.find(p => p.kind === 'projection');
        const last = actual[actual.length - 1];
        const lo = y(proj.value * 0.82), hi = y(proj.value * 1.18);
        const labels = [];
        [1000, 750, 500, 250, 0].forEach((v, i) => labels.push(React.createElement('text',
          { key: 'g' + i, x: 44, y: y(v) + 3.5, textAnchor: 'end', style: { font: '400 10px var(--font-sans)', fill: '#8B7F73' } },
          v ? v.toLocaleString() : '0')));
        pts.forEach((p, i) => {
          labels.push(this.svgText(p.xn, p.yn - 16, p.value, { font: '400 ' + (p.label === st.horizon ? '17px' : '14px') + ' var(--font-serif)', fill: p.kind === 'projection' ? '#565A40' : '#6C1E27' }, 'v' + i));
          labels.push(this.svgText(p.xn, 274, p.label.toUpperCase(), { font: '700 ' + (p.label === st.horizon ? '10.5px' : '9.5px') + ' var(--font-sans)', letterSpacing: '.1em', fill: p.label === st.horizon ? '#6C1E27' : p.kind === 'projection' ? '#565A40' : '#2E2622' }, 'n' + i));
          labels.push(this.svgText(p.xn, 290, p.when, { font: '400 9.5px var(--font-sans)', fill: '#8B7F73' }, 'w' + i));
        });
        return {
          pts, labels: React.createElement('g', { key: 'trajlabels' }, labels),
          actual: actual.map(p => p.x + ',' + p.y).join(' '),
          projection: last.x + ',' + last.y + ' ' + proj.x + ',' + proj.y,
          band: last.x + ',' + last.y + ' ' + proj.x + ',' + hi.toFixed(1) + ' ' + proj.x + ',' + lo.toFixed(1),
          target: pts.filter(p => p.kind !== 'actual').map(p => p.x + ',' + p.y).join(' '),
          area: pts.map(p => p.x + ',' + p.y).join(' ') + ' ' + pts[pts.length - 1].x + ',252 ' + x0 + ',252',
          todayX: actual[actual.length - 1].x,
          gridlines: [1000, 750, 500, 250, 0].map(v => ({ y: y(v).toFixed(1), ty: (y(v) + 3.5).toFixed(1), label: v ? v.toLocaleString() : '0' }))
        };
      })(),
      ganttMonths: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      ganttLegend: [{ label: 'Campaign', k: 'campaign' }, { label: 'Shoot', k: 'shoot' }, { label: 'System', k: 'system' }]
        .map(l => ({ label: l.label, dot: 'width:8px;height:8px;border-radius:2px;background:' + GANTT_COLOR[l.k] })),
      ganttRows: GANTT.map(g => {
        const months = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
        const end = g.start + g.span - 1;
        return { what: g.what,
          span: g.span === 1 ? months[g.start] : months[g.start] + ' – ' + months[end],
          dotStyle: 'width:8px;height:8px;flex:none;border-radius:2px;background:' + GANTT_COLOR[g.kind],
          barStyle: 'grid-column:' + (g.start + 1) + ' / span ' + g.span + ';height:16px;border-radius:5px;background:' + GANTT_COLOR[g.kind] };
      }),
      cadence: CADENCE,
      cc: this.contentCal(),
      modal: this.ccModal(),

      filters: ['All', 'Photo', 'Video', 'Reel'].map(f => ({ label: f, style: this.chipStyle(st.filter === f), go: e => { e.preventDefault(); this.setState({ filter: f }); } })),
      libItems: filtered.map(l => ({ ...l, bg: 'position:absolute;inset:0;background-image:url(' + l.img + ');background-size:cover;background-position:center' })),
      libCount: filtered.length + ' of ' + LIB.length + ' shown',

      toolkit: TOOLKIT
    };
  }
}
