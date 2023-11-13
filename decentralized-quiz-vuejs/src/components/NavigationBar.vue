<template>
  <b-navbar toggleable="lg" type="light" variant="light">
    <b-navbar-brand href="#">Decentralized Quiz</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="question-submission.html">Submit Question</b-nav-item>
        <b-nav-item href="quiz-taking.html">Take Quiz</b-nav-item>
        <b-nav-item href="answer-checking.html">Check Answers</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'NavigationBar'
}
</script>
