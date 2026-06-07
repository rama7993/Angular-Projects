import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
  standalone: false,
})
export class EducationComponent implements OnInit {
  educationItems = [
    {
      degree: 'Bachelor of Technology in Computer Science and Engineering',
      college: 'National Institute of Technology Rourkela, Odisha',
      date: 'June 2022',
      duration: 'August 2018 - June 2022',
      icon: 'pi-graduation-cap',
      description:
        'Graduated with a comprehensive understanding of computer science principles, specializing in software development and problem-solving. Actively participated in technical projects and activities that enhanced both my academic knowledge and practical skills.',
      CGPA: '8.06',
      image: './assets/images/education/university.jpg',
      driveLink:
        'https://drive.google.com/file/d/1Hf6pt3gh1cPgDmhZ4WHa44js7f4DAuuV/view?usp=sharing',
    },
    {
      degree: 'Intermediate Education (Class 12)',
      college: 'Bhashyam Junior College, Guntur, Andhra Pradesh',
      date: 'May 2018',
      duration: 'May 2016 - June 2018',
      icon: 'pi-building-columns',
      description:
        'Studied Mathematics, Physics, and Chemistry, achieving excellent academic results. This period enhanced my analytical skills and deepened my understanding of fundamental scientific concepts.',
      Percentage: '97.1%',
      image: './assets/images/education/college.jpg',
      driveLink:
        'https://drive.google.com/file/d/1LaBSiN2s8tejNqHyMne7W4P0bCCrXfBb/view?usp=sharing',
    },
    {
      degree: 'Secondary Education (Class 10)',
      college: 'Bhashyam Public School, Guntur, Andhra Pradesh',
      date: 'April 2016',
      duration: 'March 2015 - April 2016',
      icon: 'pi-briefcase',
      description:
        'Demonstrated strong academic performance across all subjects in the state board curriculum, establishing a solid foundation for higher education.',
      CGPA: '9.8',
      image: './assets/images/education/school.png',
      driveLink:
        'https://drive.google.com/file/d/1UtqZoL1JJg-wN5ucC-bS-WjIlLj0Gjct/view?usp=sharing',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
