<script>
  export let title;
</script>

<button type="button" on:click class="btn btn-w-m btn-success" >{title}</button>

<style>
  button {
    align-self: center;
    background-color: #f76cad66;
    border: 0;
    border-radius: 5px;
    color: #000;
    cursor: pointer;
    display: flex;
    font-family: 600px;
    justify-content: center;
    margin-top: 30px;
    padding: 6px 20px;
    width: 100px;
  }
</style>