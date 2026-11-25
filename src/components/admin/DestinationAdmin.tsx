"use client";

import {
  deleteDestination,
  deleteDestinationImage,
  upsertDestination,
  upsertDestinationImage,
} from "@/app/actions/admin";
import {
  DeleteButton,
  Field,
  LocalizedListFields,
  LocalizedTextFields,
  SubmitButton,
  ToggleField,
  inputClassName,
  useAdminFormCopy,
} from "@/components/admin/AdminFields";
import {
  localizedListToLines,
  localizedValue,
} from "@/lib/admin-form";
import { pickLocalized } from "@/lib/i18n-content";
import { useI18n } from "@/i18n/LanguageProvider";

type DestinationItem = {
  id: string;
  slug: string;
  wilaya: string;
  coverImage: string;
  sortOrder: number;
  published: boolean;
  name: unknown;
  location: unknown;
  description: unknown;
  longDescription: unknown;
  activities: unknown;
  accommodations: unknown;
  images: Array<{
    id: string;
    url: string;
    alt: unknown;
    sortOrder: number;
  }>;
};

export function DestinationAdmin({ items }: { items: DestinationItem[] }) {
  const copy = useAdminFormCopy();
  const { locale } = useI18n();

  return (
    <div className="space-y-6">
      <details className="rounded-[1.35rem] border border-forest/10 bg-white p-5" open>
        <summary className="cursor-pointer font-display text-xl text-forest">
          {copy.createNew}
        </summary>
        <form action={upsertDestination} className="mt-5 grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={copy.wilaya}>
              <input name="wilaya" required className={inputClassName} />
            </Field>
            <Field label={copy.displayOrder}>
              <input name="sortOrder" type="number" defaultValue={0} className={inputClassName} />
            </Field>
          </div>
          <Field label={copy.coverImage} hint={copy.coverImageHint}>
            <input name="coverImage" required placeholder="https://" className={inputClassName} dir="ltr" />
          </Field>
          <LocalizedTextFields prefix="name" label={copy.name} required />
          <LocalizedTextFields prefix="location" label={copy.location} required />
          <LocalizedTextFields
            prefix="description"
            label={copy.shortDescription}
            multiline
            rows={3}
            required
          />
          <LocalizedTextFields
            prefix="longDescription"
            label={copy.longDescription}
            multiline
            rows={5}
            required
          />
          <LocalizedListFields prefix="activities" label={copy.activitiesList} />
          <LocalizedListFields prefix="accommodations" label={copy.accommodationsList} />
          <ToggleField name="published" label={copy.published} defaultChecked />
          <SubmitButton>{copy.create}</SubmitButton>
        </form>
      </details>

      {items.map((item) => {
        const name = localizedValue(item.name);
        const activities = localizedListToLines(item.activities);
        const accommodations = localizedListToLines(item.accommodations);
        return (
          <article key={item.id} className="rounded-[1.35rem] border border-forest/10 bg-white p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-display text-2xl text-forest">
                {pickLocalized(item.name as never, locale)}
              </h3>
              <p className="text-xs text-charcoal/55">{item.wilaya}</p>
            </div>
            <form action={upsertDestination} className="grid gap-4">
              <input type="hidden" name="id" value={item.id} />
              <input type="hidden" name="slug" value={item.slug} />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={copy.wilaya}>
                  <input name="wilaya" defaultValue={item.wilaya} required className={inputClassName} />
                </Field>
                <Field label={copy.displayOrder}>
                  <input
                    name="sortOrder"
                    type="number"
                    defaultValue={item.sortOrder}
                    className={inputClassName}
                  />
                </Field>
              </div>
              <Field label={copy.coverImage} hint={copy.coverImageHint}>
                <input
                  name="coverImage"
                  defaultValue={item.coverImage}
                  required
                  className={inputClassName}
                  dir="ltr"
                />
              </Field>
              <LocalizedTextFields prefix="name" label={copy.name} values={name} required />
              <LocalizedTextFields
                prefix="location"
                label={copy.location}
                values={localizedValue(item.location)}
                required
              />
              <LocalizedTextFields
                prefix="description"
                label={copy.shortDescription}
                values={localizedValue(item.description)}
                multiline
                rows={3}
                required
              />
              <LocalizedTextFields
                prefix="longDescription"
                label={copy.longDescription}
                values={localizedValue(item.longDescription)}
                multiline
                rows={5}
                required
              />
              <LocalizedListFields
                prefix="activities"
                label={copy.activitiesList}
                values={activities}
              />
              <LocalizedListFields
                prefix="accommodations"
                label={copy.accommodationsList}
                values={accommodations}
              />
              <ToggleField name="published" label={copy.published} defaultChecked={item.published} />
              <SubmitButton>{copy.save}</SubmitButton>
            </form>
            <div className="mt-4">
              <DeleteButton
                action={deleteDestination}
                id={item.id}
                label={copy.delete}
                confirmLabel={copy.confirmDelete}
              />
            </div>

            <div className="mt-8 border-t border-forest/10 pt-5">
              <h4 className="font-display text-xl text-forest">{copy.gallery}</h4>
              <div className="mt-4 space-y-4">
                {item.images.map((image) => (
                  <div key={image.id} className="rounded-2xl bg-beige/50 p-4">
                    <form action={upsertDestinationImage} className="grid gap-3">
                      <input type="hidden" name="id" value={image.id} />
                      <input type="hidden" name="destinationId" value={item.id} />
                      <Field label={copy.imageUrl}>
                        <input
                          name="url"
                          defaultValue={image.url}
                          required
                          className={inputClassName}
                          dir="ltr"
                        />
                      </Field>
                      <LocalizedTextFields
                        prefix="alt"
                        label={copy.imageCaption}
                        values={localizedValue(image.alt)}
                        required
                      />
                      <Field label={copy.displayOrder}>
                        <input
                          name="sortOrder"
                          type="number"
                          defaultValue={image.sortOrder}
                          className={inputClassName}
                        />
                      </Field>
                      <SubmitButton>{copy.save}</SubmitButton>
                    </form>
                    <div className="mt-3">
                      <DeleteButton
                        action={deleteDestinationImage}
                        id={image.id}
                        label={copy.delete}
                        confirmLabel={copy.confirmDelete}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <form action={upsertDestinationImage} className="mt-4 grid gap-3 rounded-2xl border border-dashed border-forest/15 p-4">
                <input type="hidden" name="destinationId" value={item.id} />
                <Field label={copy.imageUrl}>
                  <input name="url" required placeholder="https://" className={inputClassName} dir="ltr" />
                </Field>
                <LocalizedTextFields prefix="alt" label={copy.imageCaption} required />
                <Field label={copy.displayOrder}>
                  <input name="sortOrder" type="number" defaultValue={0} className={inputClassName} />
                </Field>
                <SubmitButton>{copy.addImage}</SubmitButton>
              </form>
            </div>
          </article>
        );
      })}
    </div>
  );
}
