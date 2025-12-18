<template>
  <div class="flex-container">
    <div class="column">
      <img :src="profilePic" alt="Eric Peters" class="circle-image">
    </div>

    <div class="column vertical-center">
      <ul class="fa-ul">
        <li><i class="fa fa-envelope">&nbsp;&nbsp;</i>{{ email }}</li>
        <li><i class="fa fa-linkedin">&nbsp;&nbsp;</i><a href="https://www.linkedin.com/in/epetersio" target="_blank">LinkedIn</a></li>
        <li><i class="fa fa-github">&nbsp;&nbsp;</i><a :href="github" target="_blank">github.com/edp8489</a></li>
        <li><i class="fa fa-file-text-o">&nbsp;&nbsp;</i><a :href="resume">Resume</a></li>
      </ul>
      &nbsp;<br />
      <div style="text-align: center">
          <a href="https://www.buymeacoffee.com/epetersio" target="_blank">
            <img src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" >
          </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useData } from 'vitepress'

const { frontmatter } = useData()

const email = frontmatter.value.email || 'eric [at] epeters.io'
const profilePic = frontmatter.value.profile_pic || '/assets/profile_pic.jpeg'
const github = frontmatter.value.github || 'https://github.com/edp8489'
const resume = frontmatter.value.resume || '/assets/epeters_cv_2025-02.pdf'
</script>

<style scoped>
.flex-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.column {
  flex: 45%;
}
.column-spacer {
  flex: 10%;
}
.circle-image {
  border-radius: 50%;
  border-width: 2px;
  border-color: var(--text);
  border-style: solid;
  overflow: hidden;
  width: 90%;
  height: auto;
  object-fit: cover;
}
.vertical-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
ul {
  list-style-type: none;

}
.bmc-button {
  display: inline-flex;
  align-items: center;
  padding: 7px 15px;
  background-color: #5F7FFF;
  color: #ffffff;
  border-radius: 8px;
  border: 1px solid #000000;
  text-decoration: none;
  font-family: 'Cookie', cursive;
  font-size: 24px;
  letter-spacing:0.6px !important;
  transition: background-color 0.3s ease;
}
.bmc-button:hover {
  background-color: #4a6ae6;
}
.bmc-emoji {
  margin-right: 8px;
  font-size: 24px;
}
.bmc-text {
  line-height: 1;
}
</style>
