<template>
  <div id="app">
    <NavigationBar />
    <div class="container">
      <h1>Question Submission</h1>
      <QuestionForm />
    </div>
  </div>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue'
import QuestionForm from './components/QuestionForm.vue'

export default {
  name: 'App',
  components: {
    NavigationBar,
    QuestionForm
  }
}
</script>

<style>
@import './assets/app.css';
</style>
