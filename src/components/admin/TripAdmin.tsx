"use client";

import { deleteTrip, upsertTrip } from "@/app/actions/admin";
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

type DestinationOption = { id: string; slug: string; name: unknown };
type TripItem = {
  id: string;
  slug: string;
  destinationId: string;
  durationDays: number;
  basePriceDzd: number | string;
  imageUrl: string;
  sortOrder: number;
  published: boolean;
  name: unknown;
  description: unknown;
  longDescription: unknown;
  accommodationLabel: unknown;
  category: unknown;
  activities: unknown;
  itinerary: unknown;
};

export function TripAdmin({
  items,
  destinations,
}: {
  items: TripItem[];
  destinations: DestinationOption[];
}) {
  const copy = useAdminFormCopy();
  const { locale } = useI18n();

  return (
    <div className="space-y-6">
      <details className="rounded-[1.35rem] border border-forest/10 bg-white p-5" open>
        <summary className="cursor-pointer font-display text-xl text-forest">
          {copy.createNew}
        </summary>
        <form action={upsertTrip} className="mt-5 grid gap-4">
          <Field label={copy.destination}>
            <select name="destinationId" required className={inputClassName}>
              {destinations.map((destination) => (
                <option key={destination.id} value={destination.id}>
                  {pickLocalized(destination.name as never, locale)}
                </option>
              ))}
            </select>
          </Field>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label={copy.durationDays}>
              <input name="durationDays" type="number" defaultValue={3} min={1} className={inputClassName} />
            </Field>
            <Field label={copy.priceDzd}>
              <input name="basePriceDzd" type="number" defaultValue={0} min={0} className={inputClassName} />
            </Field>
            <Field label={copy.displayOrder}>
              <input name="sortOrder" type="number" defaultValue={0} className={inputClassName} />
            </Field>
          </div>
          <Field label={copy.coverImage} hint={copy.coverImageHint}>
            <input name="imageUrl" required placeholder="https://" className={inputClassName} dir="ltr" />
          </Field>
          <LocalizedTextFields prefix="name" label={copy.name} required />
          <LocalizedTextFields prefix="category" label={copy.category} required />
          <LocalizedTextFields
            prefix="accommodationLabel"
            label={copy.accommodationLabel}
            required
          />
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
          <LocalizedListFields prefix="itinerary" label={copy.itineraryList} />
          <ToggleField name="published" label={copy.published} defaultChecked />
          <SubmitButton>{copy.create}</SubmitButton>
        </form>
      </details>

      {items.map((item) => (
        <article key={item.id} className="rounded-[1.35rem] border border-forest/10 bg-white p-5">
          <h3 className="mb-4 font-display text-2xl text-forest">
            {pickLocalized(item.name as never, locale)}
          </h3>
          <form action={upsertTrip} className="grid gap-4">
            <input type="hidden" name="id" value={item.id} />
            <input type="hidden" name="slug" value={item.slug} />
            <Field label={copy.destination}>
              <select
                name="destinationId"
                defaultValue={item.destinationId}
                required
                className={inputClassName}
              >
                {destinations.map((destination) => (
                  <option key={destination.id} value={destination.id}>
                    {pickLocalized(destination.name as never, locale)}
                  </option>
                ))}
              </select>
            </Field>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label={copy.durationDays}>
                <input
                  name="durationDays"
                  type="number"
                  defaultValue={item.durationDays}
                  min={1}
                  className={inputClassName}
                />
              </Field>
              <Field label={copy.priceDzd}>
                <input
                  name="basePriceDzd"
                  type="number"
                  defaultValue={Number(item.basePriceDzd)}
                  min={0}
                  className={inputClassName}
                />
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
                name="imageUrl"
                defaultValue={item.imageUrl}
                required
                className={inputClassName}
                dir="ltr"
              />
            </Field>
            <LocalizedTextFields
              prefix="name"
              label={copy.name}
              values={localizedValue(item.name)}
              required
            />
            <LocalizedTextFields
              prefix="category"
              label={copy.category}
              values={localizedValue(item.category)}
              required
            />
            <LocalizedTextFields
              prefix="accommodationLabel"
              label={copy.accommodationLabel}
              values={localizedValue(item.accommodationLabel)}
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
              values={localizedListToLines(item.activities)}
            />
            <LocalizedListFields
              prefix="itinerary"
              label={copy.itineraryList}
              values={localizedListToLines(item.itinerary)}
            />
            <ToggleField name="published" label={copy.published} defaultChecked={item.published} />
            <SubmitButton>{copy.save}</SubmitButton>
          </form>
          <div className="mt-4">
            <DeleteButton
              action={deleteTrip}
              id={item.id}
              label={copy.delete}
              confirmLabel={copy.confirmDelete}
            />
          </div>
        </article>
      ))}
    </div>
  );
}
