<template>
    <div class="card-root">
        <div class="card-value">
            <div class="value">{{value}}</div>
            <p class="unit">{{unit}}</p>
            <p class="title">{{title}}</p>
        </div>
    </div>
</template>
<script>
export default {
  props: ['value', 'unit', 'title']
}
</script>
<style scoped>
.card-value {
    border: 2px solid #E80D7C;
    margin: 20px;
    border-radius: 0.3rem;
}

.card-root {
  flex-basis: 33.33%;
  -ms-flex: auto;
  position: relative;
  box-sizing: border-box;
}

.value{
    font-size: 3.5rem;
    font-weight: 900;
    margin-bottom: 0;
    line-height: 1;
    padding-top: 10px;
}
.unit{
    font-size: 1rem;
}
.title{
    font-size: 1.3rem;
}

@media(max-width: 815px) {
  .card-root {
    flex-basis: 50%;
  }
}
@media(max-width: 555px) {
  .card-root {
    flex-basis: 100%;
  }
}
</style>
