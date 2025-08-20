<!-- src\components\Contest\WinnersGrid.vue -->

<template>
  <div>
    <div class="participants-grid">
      <WinnerCard 
        v-for="winner in paginatedWinners" 
        :key="winner.id"
        :participant="winner" 
      />
    </div>
    
    <Pagination 
      v-if="allWinners.length > itemsPerPage"
      :current-page="currentPage"
      :total-items="allWinners.length"
      :items-per-page="itemsPerPage"
      @page-change="handlePageChange"
    />
  </div>
</template>

<script>
import WinnerCard from './WinnerCard.vue'
import Pagination from './Pagination.vue'

export default {
  name: 'WinnersGrid',
  components: {
    WinnerCard,
    Pagination
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 20,
      allWinners: [
        {
          id: 1,
          image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=500&fit=crop',
          title: 'Матрешка белая название',
          price: 60000,
          author: 'Светлана Петрикова',
          country: 'Germany',
          countryFlag: 'https://flagcdn.com/w40/de.png',
          isLiked: false,
          place: 1
        },
        {
          id: 2,
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
          title: 'Матрешка белая название в 2 строки название в ...',
          price: 60000,
          author: 'Светлана Петрикова',
          country: 'Romania',
          countryFlag: 'https://flagcdn.com/w40/ro.png',
          isLiked: true,
          place: 2
        },
        {
          id: 3,
          image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=600&fit=crop',
          title: 'Матрешка белая название',
          price: 60000,
          author: 'Светлана Петрикова',
          country: 'Ukraine',
          countryFlag: 'https://flagcdn.com/w40/ua.png',
          isLiked: false,
          place: 3
        },
        ...Array.from({length: 9}, (_, i) => ({
          id: 4 + i,
          image: [
            'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=350&fit=crop',
            'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=400&h=450&fit=crop',
            'https://images.unsplash.com/photo-1576662712957-9c79ae1280f8?w=400&h=280&fit=crop'
          ][i % 3],
          title: `Матрешка белая название ${4 + i}`,
          price: 60000,
          author: 'Светлана Петрикова',
          country: ['Germany', 'Romania', 'Ukraine'][i % 3],
          countryFlag: ['https://flagcdn.com/w40/de.png', 'https://flagcdn.com/w40/ro.png', 'https://flagcdn.com/w40/ua.png'][i % 3],
          isLiked: false,
          place: 4 + i
        }))
      ]
    }
  },
  computed: {
    paginatedWinners() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.allWinners.slice(start, end);
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