import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Victoria Studio') // Personalize the dashboard title
    .items([
      // 1. Victoria's Works
      S.documentTypeListItem('project').title('Portfolio Projects'),
      
      S.divider(), // Visual line to separate content from settings

      // 2. Global Site Settings (Optional: For her Bio, SEO, etc.)
      // If you create a "settings" schema later, you can add it here.
      
      // 3. Automatically list any other types you might add later
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['project', 'post', 'author', 'category'].includes(item.getId()!),
      ),
    ])