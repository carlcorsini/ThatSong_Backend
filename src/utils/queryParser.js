const queryParser = query => {
  query.q = query.q ? query.q.split(/(?<=[*])(.*)(?=[*])/)[1] : ''
  query.orderParam = query.order.split('.')[0] || ''
  query.orderDirection = query.order.split('.')[1] || ''
  return query
}

module.exports = queryParser
