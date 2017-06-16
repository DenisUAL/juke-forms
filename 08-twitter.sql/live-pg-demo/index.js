const pg = require('pg')

const client = new pg.Client(
  'postgres://localhost/juke'
)

client.connect((err, client) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }  
  getSongs(client)
})

function getSongs(client) {
  client.query('select * from songs', (err, result) => {
    console.log(result.rows)
  })

  client.query(`
    insert into songs
      (name, url, "createdAt", "updatedAt")
      values ($1, $2, NOW(), NOW())
      RETURNING *`,
      ["Despacito'); DROP TABLE songs; --", 'http://whatever...'], (err, result) => {
    if (err) return console.error(err)
    console.log(`Inserted ${result.rows.length} rows`)
    console.log(result.rows)
  })
}
