const Student = require('../models').Student;

const expect = require('chai').expect;

describe('Student Model', function() {
  beforeEach('Sync and empty student table', function() {
    return Student.sync({force: true})
      // .then(() => {
      //   done();
      // })
      // .catch(done)
  });

  beforeEach('populate database', function() {
    const student1 = Student.create({
      name: 'Karen',
      campus: 'Fullstack Academy NYC',
      cohort: '1507'
    });

    const student2 = Student.create({
      name: 'Olivia',
      campus: 'Fullstack Academy NYC',
      cohort: '1706'
    });

    const student3 = Student.create({
      name: 'Liz',
      campus: 'Grace Hopper Program',
      cohort: '1704'
    });

    return Promise.all([student1, student2, student3])
  })

  it('Student model exists', function() {
    expect(Student).to.be.an('object');
  });

  describe('Classmethod findByCampus', function() {
    it('exists', function() {
      expect(Student.findByCampus).to.be.a('function');
    })

    it('should give us back karen and olivia when called with Fullstack academy nyc', function() {
      return Student.findByCampus('Fullstack Academy NYC')
        .then(foundStudents => {
          return foundStudents.map(student => student.name).sort();
        })
        .then(studentNames => {
          expect(studentNames).to.be.deep.equal(['Karen', 'Olivia']);
        });
    })
  })

})
