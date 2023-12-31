export default class BasicEngine {
  constructor() {
    this.tasks = []
    this.dynamicStyle = {}
    this.options = {
      slots: {
        header: {}
      },
      taskMapping: {
        // todo
        id: 'id',
        label: 'label',
        // todo
        plannedStart: 'plannedStart',
        plannedEnd: 'plannedEnd',
        actualStart: 'actualStart',
        actualEnd: 'actualEnd',
        // duration: 'duration',
        progress: 'progress',
        type: 'type',
        style: 'style',
        collapsed: 'collapsed'
      },
      width: 0,
      height: 0,
      clientWidth: 0,
      outerHeight: 0,
      rowsHeight: 0,
      allVisibleTasksHeight: 0,
      scroll: {
        scrolling: false,
        dragXMoveMultiplier: 3, //*
        dragYMoveMultiplier: 2, //*
        top: 0,
        taskList: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        },
        chart: {
          left: 0,
          right: 0,
          percent: 0,
          timePercent: 0,
          top: 0,
          bottom: 0,
          time: 0,
          timeCenter: 0,
          dateTime: {
            left: '',
            right: ''
          }
        }
      },
      scope: {
        //*
        before: 1,
        after: 1
      },
      // todo
      times: {
        timeScale: 24 * 60 * 1000,
        timeZoom: 2,
        timePerPixel: 1,
        firstTime: new Date('2022-08-01').getTime(),
        lastTime: new Date('2024-05-31').getTime(),
        firstTaskTime: new Date('2023-03-01').getTime(),
        lastTaskTime: new Date('2023-11-30').getTime(),
        totalViewDurationMs: 0,
        totalViewDurationPx: 0,
        stepDuration: 'day', // 时间精度范围
        steps: []
      },
      row: {
        height: 36 //*
      },
      maxRows: 20, //*
      maxHeight: 0, //*
      chart: {
        grid: {
          horizontal: {
            gap: 6 //*
          }
        },
        progress: {
          width: 20, //*
          height: 6, //*
          pattern: true,
          bar: false
        },
        text: {
          offset: 4, //*
          xPadding: 10, //*
          display: true //*
        },
        expander: {
          type: 'chart',
          display: true, //*
          displayIfTaskListHidden: true, //*
          offset: 4, //*
          size: 18
        }
      },
      taskList: {
        display: true, //*
        resizeAfterThreshold: false, // 在临界值之后调整大小
        widthThreshold: 75, //*
        columns: [
          //*
          {
            id: 0,
            label: 'ID',
            value: 'id',
            width: 40
          }
        ],
        percent: 100, //*
        width: 0,
        finalWidth: 0,
        widthFromPercentage: 0,
        minWidth: 18,
        expander: {
          type: 'task-list',
          size: 16,
          columnWidth: 24,
          padding: 16,
          margin: 10,
          straight: false
        }
      },
      calendar: {
        // onlyDisplayWorkDay: false,
        workingDays: [1, 2, 3, 4, 5], // 工作日 [1, 2, 3, 4, 5, 6, 0]
        gap: 6, //*
        height: 0,
        strokeWidth: 1,
        hour: {
          height: 20, //*
          display: false, //*
          widths: [],
          maxWidths: { short: 0, medium: 0, long: 0 },
          formatted: {
            long: [],
            medium: [],
            short: []
          },
          format: {
            //*
            long(date) {
              return date.format('HH:mm')
            },
            medium(date) {
              return date.format('HH:mm')
            },
            short(date) {
              return date.format('HH')
            }
          }
        },
        day: {
          height: 20, //*
          display: true, //*
          widths: [],
          maxWidths: { short: 0, medium: 0, long: 0 },
          format: {
            long(date) {
              return date.format('DD dddd')
            },
            medium(date) {
              return date.format('DD ddd')
            },
            short(date) {
              return date.format('DD')
            }
          }
        },
        month: {
          height: 20, //*
          display: true, //*
          widths: [],
          maxWidths: { short: 0, medium: 0, long: 0 },
          format: {
            //*
            short(date) {
              return date.format('MM')
            },
            medium(date) {
              return date.format("MMM 'YY")
            },
            long(date) {
              return date.format('MMMM YYYY')
            }
          }
        }
      },
      locale: {
        name: 'en',
        weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        months:
          'January_February_March_April_May_June_July_August_September_October_November_December'.split(
            '_'
          ),
        monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        weekStart: 1,
        relativeTime: {
          future: 'in %s',
          past: '%s ago',
          s: 'a few seconds',
          m: 'a minute',
          mm: '%d minutes',
          h: 'an hour',
          hh: '%d hours',
          d: 'a day',
          dd: '%d days',
          M: 'a month',
          MM: '%d months',
          y: 'a year',
          yy: '%d years'
        },
        formats: {
          LT: 'HH:mm',
          LTS: 'HH:mm:ss',
          L: 'DD/MM/YYYY',
          LL: 'D MMMM YYYY',
          LLL: 'D MMMM YYYY HH:mm',
          LLLL: 'dddd, D MMMM YYYY HH:mm'
        },
        ordinal: (n) => {
          const s = ['th', 'st', 'nd', 'rd']
          const v = n % 100
          return `[${n}${s[(v - 20) % 10] || s[v] || s[0]}]`
        }
      }
    }
  }

  setTasks(tasks) {
    this.tasks = tasks
  }

  setDynamicStyle(dynamicStyle) {
    this.dynamicStyle = dynamicStyle
  }

  setOptions(options) {
    this.options = options
  }
}
