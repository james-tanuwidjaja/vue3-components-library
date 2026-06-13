import { onBeforeUnmount, onMounted, type Ref } from 'vue';

type ElementRef = Ref<HTMLElement | null | undefined>;

/**
 * Invoke `handler` when a pointerdown occurs outside all of the given elements.
 * Useful for closing dropdowns/popovers. Teleported panels work because `contains`
 * checks the live DOM node.
 */
export function useClickOutside(
  elements: ElementRef | ElementRef[],
  handler: (event: PointerEvent) => void,
): void {
  const refs = Array.isArray(elements) ? elements : [elements];

  function onPointerDown(event: PointerEvent): void {
    const target = event.target as Node | null;
    if (!target) return;
    const inside = refs.some((elementRef) => elementRef.value?.contains(target));
    if (!inside) handler(event);
  }

  onMounted(() => document.addEventListener('pointerdown', onPointerDown, true));
  onBeforeUnmount(() => document.removeEventListener('pointerdown', onPointerDown, true));
}
