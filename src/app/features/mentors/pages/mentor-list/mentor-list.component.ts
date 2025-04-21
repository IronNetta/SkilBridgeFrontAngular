import {
  Component,
  effect,
  signal,
  WritableSignal,
  inject
} from '@angular/core';
import { MentorService } from '../../services/mentor.service';
import { Mentor } from '../../models/mentor.model';
import { Skill } from '../../models/skill.model';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { PaginatorModule } from 'primeng/paginator';
import { FormsModule } from '@angular/forms';
import {Select} from 'primeng/select';

@Component({
  selector: 'app-mentor-list',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    RatingModule,
    DropdownModule,
    InputNumberModule,
    PaginatorModule,
    FormsModule,
    Select
  ],
  templateUrl: './mentor-list.component.html',
  styleUrls: ['./mentor-list.component.scss']
})
export class MentorListComponent {
  private readonly _mentorService = inject(MentorService);

  mentors: WritableSignal<Mentor[]> = signal([]);
  totalPages = signal(0);
  currentPage = signal(1);

  // Filtres
  skills: WritableSignal<Skill[]> = signal([]);
  selectedSkill = signal<string | undefined>(undefined);
  minRating = signal<number | undefined>(undefined);

  constructor() {
    this._mentorService.getSkills().subscribe((skills) => this.skills.set(skills));

    // Actualise les mentors si l'un des filtres ou la page change
    effect(() => {
      this._mentorService
        .getMentors(this.selectedSkill(), this.minRating(), this.currentPage())
        .subscribe({
          next: (res) => {
            console.log('Réponse API :', res); // Pour déboguer
            this.mentors.set(res.results);
            this.totalPages.set(res.totalPages);
          },
          error: (err) => {
            console.error('Erreur lors du chargement des mentors :', err);
            // Gérer l'erreur (peut-être afficher un message à l'utilisateur)
            this.mentors.set([]); // Assurez-vous que mentors n'est pas undefined
          }
        });
    });
  }

  onSkillChange(skill: string | undefined) {
    this.selectedSkill.set(skill);
    this.currentPage.set(1); // reset pagination
  }

  onMinRatingChange(value: number | string | null) {
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;

    if (numericValue === null || isNaN(numericValue)) {
      this.minRating.set(undefined);
    } else {
      this.minRating.set(numericValue);
    }

    this.currentPage.set(1);
  }


  onPageChange(event: any) {
    const page = Number(event.page);
    if (!isNaN(page)) {
      this.currentPage.set(page + 1); // PrimeNG commence à 0
    }
  }


}
