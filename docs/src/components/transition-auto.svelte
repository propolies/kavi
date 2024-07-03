<script lang="ts">
  export let show: boolean
  // Transition from 0 to auto on the y axis
  export let transitionY = false
  // Transition from 0 to auto on the x axis
  export let transitionX = false
</script>

<!-- Hack transition auto -->
<div class="transition-all grid {show
  ? `
    ${transitionX && "grid-cols-[1fr]"} 
    ${transitionY && "grid-rows-[1fr]"}`
  : `
    ${transitionX && "grid-cols-[0fr]"} 
    ${transitionY && "grid-rows-[0fr]"}`
}">
  <div class="overflow-hidden">
    <slot />
  </div>
</div>
