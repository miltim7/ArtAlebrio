<!-- src\components\Contest\ParticipantsGrid.vue -->

<template>
  <div>
    <div class="participants-grid">
      <ParticipantCard 
        v-for="participant in paginatedParticipants" 
        :key="participant.id"
        :participant="participant" 
      />
    </div>
    
    <Pagination 
      v-if="allParticipants.length > itemsPerPage"
      :current-page="currentPage"
      :total-items="allParticipants.length"
      :items-per-page="itemsPerPage"
      @page-change="handlePageChange"
    />
  </div>
</template>

<script>
import ParticipantCard from './ParticipantCard.vue'
import Pagination from './Pagination.vue'

export default {
  name: 'ParticipantsGrid',
  components: {
    ParticipantCard,
    Pagination
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 20,
      allParticipants: [
        {
          id: 1,
          image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=500&fit=crop',
          title: 'Матрешка белая название',
          price: 60000,
          author: 'Светлана Петрикова',
          country: 'Germany',
          countryFlag: 'https://flagcdn.com/w40/de.png',
          isLiked: false
        },
        {
          id: 2,
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
          title: 'Матрешка белая название в 2 строки название в ...',
          price: 60000,
          author: 'Светлана Петрикова',
          country: 'Romania',
          countryFlag: 'https://flagcdn.com/w40/ro.png',
          isLiked: true
        },
        {
          id: 3,
          image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=600&fit=crop',
          title: 'Матрешка белая название',
          price: 60000,
          author: 'Светлана Петрикова',
          country: 'Ukraine',
          countryFlag: 'https://flagcdn.com/w40/ua.png',
          isLiked: false
        },
        {
          id: 4,
          image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=350&fit=crop',
          title: 'Матрешка белая название',
          price: 60000,
          author: 'Светлана Петрикова',
          country: 'UK',
          countryFlag: 'https://flagcdn.com/w40/gb.png',
          isLiked: false
        },
        {
          id: 5,
          image: 'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=400&h=450&fit=crop',
          title: 'Матрешка белая название в 2 строки название в ...',
          price: 60000,
          author: 'Светлана Петрикова',
          country: 'Hungary',
          countryFlag: 'https://flagcdn.com/w40/hu.png',
          isLiked: false
        },
        {
          id: 6,
          image: 'https://images.unsplash.com/photo-1576662712957-9c79ae1280f8?w=400&h=280&fit=crop',
          title: 'Матрешка белая название',
          price: 60000,
          author: 'Светлана Петрикова',
          country: 'Ukraine',
          countryFlag: 'https://flagcdn.com/w40/ua.png',
          isLiked: false
        },
        {
          id: 7,
          image: 'https://images.unsplash.com/photo-1549289524-06cf8837ace5?w=400&h=550&fit=crop',
          title: 'Матрешка белая название в 2 строки название в ...',
          price: 60000,
          author: 'Светлана Петрикова',
          country: 'Romania',
          countryFlag: 'https://flagcdn.com/w40/ro.png',
          isLiked: false
        },
        {
          id: 8,
          image: 'https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?w=400&h=320&fit=crop',
          title: 'Матрешка белая название',
          price: 60000,
          author: 'Светлана Петрикова',
          country: 'Ukraine',
          countryFlag: 'https://flagcdn.com/w40/ua.png',
          isLiked: false
        },
        {
          id: 9,
          image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=480&fit=crop',
          title: 'Матрешка белая название',
          price: 60000,
          author: 'Светлана Петрикова',
          country: 'France',
          countryFlag: 'https://flagcdn.com/w40/fr.png',
          isLiked: false
        },
        {
          id: 10,
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=380&fit=crop',
          title: 'Матрешка белая название в 2 строки',
          price: 60000,
          author: 'Светлана Петрикова',
          country: 'Italy',
          countryFlag: 'https://flagcdn.com/w40/it.png',
          isLiked: false
        },
        ...Array.from({length: 15}, (_, i) => ({
          id: 11 + i,
          image: [
            'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=500&fit=crop',
            'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=600&fit=crop',
            'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=350&fit=crop',
            'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=400&h=450&fit=crop'
          ][i % 5],
          title: `Матрешка белая название ${11 + i}`,
          price: 60000,
          author: 'Светлана Петрикова',
          country: ['Germany', 'Romania', 'Ukraine', 'UK', 'Hungary'][i % 5],
          countryFlag: ['https://flagcdn.com/w40/de.png', 'https://flagcdn.com/w40/ro.png', 'https://flagcdn.com/w40/ua.png', 'https://flagcdn.com/w40/gb.png', 'https://flagcdn.com/w40/hu.png'][i % 5],
          isLiked: false
        }))
      ]
    }
  },
  computed: {
    paginatedParticipants() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.allParticipants.slice(start, end);
    }
  },
  methods: {
    handlePageChange(page) {
      this.currentPage = page;
      this.$nextTick(() => {
        const element = this.$el.querySelector('.participants-grid');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }
  }
}
</script>

<style scoped>
.participants-grid {
  columns: 4;
  column-gap: 24px;
}

.participants-grid > * {
  display: inline-block;
  margin-bottom: 24px;
  width: 100%;
  break-inside: avoid;
}

@media (max-width: 1200px) {
  .participants-grid {
    columns: 3;
    column-gap: 20px;
  }
  
  .participants-grid > * {
    margin-bottom: 20px;
  }
}

@media (max-width: 768px) {
  .participants-grid {
    columns: 2;
    column-gap: 16px;
  }
  
  .participants-grid > * {
    margin-bottom: 16px;
  }
}

@media (max-width: 480px) {
  .participants-grid {
    columns: 2;
    column-gap: 12px;
  }
  
  .participants-grid > * {
    margin-bottom: 12px;
  }
}
</style>