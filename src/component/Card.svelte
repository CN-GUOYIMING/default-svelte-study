<script>
  export let title;
  export let contentStyle;
</script>

<section>
  <div class="title">{title}</div>
  
  <article style={contentStyle}>
    <slot></slot>
  </article>
</section>

<style>
  section {
    border-radius: 2px;
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.7);
  }

  section .title {
    background-color: #f76cadcc;
    color: #fff;
    font-weight: 400;
    padding: 5px 20px;
  }
  
  section article {
    background-color: #f76cad33;
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
  }
</style>