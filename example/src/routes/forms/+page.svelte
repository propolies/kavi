<script lang="ts">
  import { api } from "$lib/kavi/client"
  import { UserSchema } from "$lib/kavi/schemas"
  import { Form } from "kavi/client"

  const form = Form(api.formTest, {
    schema: UserSchema,
    onsuccess: (data) => console.log("SUCCESS", data),
    onerror: (err) => console.log("ERRROR", err),
    beforesubmit: (fields) => fields,
  })
</script>

<div>{form.loading}</div>

<div class="flex items-center justify-center my-32">
  <div class="flex flex-col">
    <h2 class="text-2xl font-semibold mb-4">Form</h2>
    <form class="flex flex-col gap-4" onsubmit={form.onsubmit}>
      <div class="flex flex-col gap-1">
        <label for="nameId">Name</label>
        <input
          name="name"
          id="nameId"
          bind:value={form.fields.name}
          aria-invalid={form.errors.name ? "true" : "false"}
          placeholder="Enter name..."
          oninput={() => (form.errors.name = undefined)}
          class="input input-bordered {form.errors.name && 'bg-error'}"
        />
        {#each form.errors.name ?? [] as error}
          <span>{error}</span>
        {/each}
      </div>
      <div class="flex flex-col gap-1">
        <label for="ageId">Age</label>
        <input
          name="age"
          id="ageId"
          type="number"
          bind:value={form.fields.age}
          aria-invalid={form.errors.age ? "true" : "false"}
          placeholder="Enter age..."
          oninput={() => (form.errors.age = undefined)}
          class="input input-bordered {form.errors.age && 'bg-error'}"
        />
        {#each form.errors.age ?? [] as error}
          <span>{error}</span>
        {/each}
      </div>
      <div class="flex flex-col gap-1">
        <label for="passwordId">Password</label>
        <input
          name="password"
          id="passwordId"
          bind:value={form.fields.password}
          aria-invalid={form.errors.password ? "true" : "false"}
          type="password"
          placeholder="Enter password..."
          oninput={() => (form.errors.password = undefined)}
          class="input input-bordered {form.errors.password && 'bg-error'}"
        />
        {#each form.errors.password ?? [] as error}
          <span>{error}</span>
        {/each}
      </div>
      <button class="btn btn-primary bg-primary"> Submit </button>
    </form>
  </div>
</div>
