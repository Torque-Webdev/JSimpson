import moment from 'moment'

export const filter = {
  filters: {
    formatDate (val) {
      if (!val) {
        return '-'
      }
      const date = val
      return moment(date).format('Do MMM YYYY')
    },
    fullDate (val) {
      if (!val) {
        return '-'
      }
      const date = val
      return moment(date).format('dddd Do, MMMM YYYY')
    },
    formatCreation (val) {
      if (!val) {
        return '-'
      }
      const date = val.toDate()
      return moment(date).fromNow()
    },
  },
}
