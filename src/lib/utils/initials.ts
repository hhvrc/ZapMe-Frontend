export function GetUsernameInitials(name: string): string {
  const mathces = name.matchAll(/(\p{L}{1})\p{L}+/gu);

  const initials = [...mathces] || [];
  const spacedInitials = ((initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')).toUpperCase();

  if (spacedInitials.length < 2) {
    return name.slice(0, 2).toUpperCase();
  }

  return spacedInitials;
}