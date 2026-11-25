"use client";

import {
  deleteAccommodation,
  deleteActivity,
  deleteEmissionFactor,
  deleteTransport,
  upsertAccommodation,
  upsertActivity,
  upsertEmissionFactor,
  upsertTransport,
} from "@/app/actions/admin";
import {
  DeleteButton,
  Field,
  LocalizedTextFields,
  SubmitButton,
  ToggleField,
  inputClassName,
  useAdminFormCopy,
} from "@/components/admin/AdminFields";
import { localizedValue } from "@/lib/admin-form";
import { pickLocalized } from "@/lib/i18n-content";
import { useI18n } from "@/i18n/LanguageProvider";

type DestinationOption = { id: string; slug: string; name: unknown };

type SharedItem = {
  id: string;
  code: string;
  name: unknown;
  description: unknown;
  active: boolean;
};

export function AccommodationAdmin({
  items,
  destinations,
}: {
  items: Array<
    SharedItem & {
      type: string;
      pricePerNightDzd: number | string;
      destinationId: string | null;
    }
  >;
  destinations: DestinationOption[];
}) {
  const copy = useAdminFormCopy();
  const { locale } = useI18n();

  return (
    <div className="space-y-6">
      <details className="rounded-[1.35rem] border border-forest/10 bg-white p-5" open>
        <summary className="cursor-pointer font-display text-xl">{copy.createNew}</summary>
        <form action={upsertAccommodation} className="mt-5 grid gap-4">
          <Field label={copy.accommodationType}>
            <select name="type" className={inputClassName}>
              <option value="guesthouse">{copy.typeGuesthouse}</option>
              <option value="eco_camp">{copy.typeEcoCamp}</option>
              <option value="green_hotel">{copy.typeGreenHotel}</option>
            </select>
          </Field>
          <Field label={copy.destination}>
            <select name="destinationId" className={inputClassName}>
              <option value="">{copy.noDestination}</option>
              {destinations.map((destination) => (
                <option key={destination.id} value={destination.id}>
                  {pickLocalized(destination.name as never, locale)}
                </option>
              ))}
            </select>
          </Field>
          <Field label={copy.pricePerNight}>
            <input name="pricePerNightDzd" type="number" defaultValue={0} className={inputClassName} />
          </Field>
          <LocalizedTextFields prefix="name" label={copy.name} required />
          <LocalizedTextFields
            prefix="description"
            label={copy.shortDescription}
            multiline
            rows={3}
            required
          />
          <ToggleField name="active" label={copy.active} defaultChecked />
          <SubmitButton>{copy.create}</SubmitButton>
        </form>
      </details>

      {items.map((item) => (
        <article key={item.id} className="rounded-[1.35rem] border border-forest/10 bg-white p-5">
          <h3 className="mb-4 font-display text-2xl">
            {pickLocalized(item.name as never, locale)}
          </h3>
          <form action={upsertAccommodation} className="grid gap-4">
            <input type="hidden" name="id" value={item.id} />
            <input type="hidden" name="code" value={item.code} />
            <Field label={copy.accommodationType}>
              <select name="type" defaultValue={item.type} className={inputClassName}>
                <option value="guesthouse">{copy.typeGuesthouse}</option>
                <option value="eco_camp">{copy.typeEcoCamp}</option>
                <option value="green_hotel">{copy.typeGreenHotel}</option>
              </select>
            </Field>
            <Field label={copy.destination}>
              <select
                name="destinationId"
                defaultValue={item.destinationId ?? ""}
                className={inputClassName}
              >
                <option value="">{copy.noDestination}</option>
                {destinations.map((destination) => (
                  <option key={destination.id} value={destination.id}>
                    {pickLocalized(destination.name as never, locale)}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={copy.pricePerNight}>
              <input
                name="pricePerNightDzd"
                type="number"
                defaultValue={Number(item.pricePerNightDzd)}
                className={inputClassName}
              />
            </Field>
            <LocalizedTextFields
              prefix="name"
              label={copy.name}
              values={localizedValue(item.name)}
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
            <ToggleField name="active" label={copy.active} defaultChecked={item.active} />
            <SubmitButton>{copy.save}</SubmitButton>
          </form>
          <div className="mt-4">
            <DeleteButton
              action={deleteAccommodation}
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

export function ActivityAdmin({
  items,
}: {
  items: Array<SharedItem & { priceDzd: number | string }>;
}) {
  const copy = useAdminFormCopy();
  const { locale } = useI18n();

  return (
    <div className="space-y-6">
      <details className="rounded-[1.35rem] border border-forest/10 bg-white p-5" open>
        <summary className="cursor-pointer font-display text-xl">{copy.createNew}</summary>
        <form action={upsertActivity} className="mt-5 grid gap-4">
          <Field label={copy.priceDzd}>
            <input name="priceDzd" type="number" defaultValue={0} className={inputClassName} />
          </Field>
          <LocalizedTextFields prefix="name" label={copy.name} required />
          <LocalizedTextFields
            prefix="description"
            label={copy.shortDescription}
            multiline
            rows={3}
            required
          />
          <ToggleField name="active" label={copy.active} defaultChecked />
          <SubmitButton>{copy.create}</SubmitButton>
        </form>
      </details>
      {items.map((item) => (
        <article key={item.id} className="rounded-[1.35rem] border border-forest/10 bg-white p-5">
          <h3 className="mb-4 font-display text-2xl">
            {pickLocalized(item.name as never, locale)}
          </h3>
          <form action={upsertActivity} className="grid gap-4">
            <input type="hidden" name="id" value={item.id} />
            <input type="hidden" name="code" value={item.code} />
            <Field label={copy.priceDzd}>
              <input
                name="priceDzd"
                type="number"
                defaultValue={Number(item.priceDzd)}
                className={inputClassName}
              />
            </Field>
            <LocalizedTextFields
              prefix="name"
              label={copy.name}
              values={localizedValue(item.name)}
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
            <ToggleField name="active" label={copy.active} defaultChecked={item.active} />
            <SubmitButton>{copy.save}</SubmitButton>
          </form>
          <div className="mt-4">
            <DeleteButton
              action={deleteActivity}
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

export function TransportAdmin({
  items,
}: {
  items: Array<
    SharedItem & {
      priceDzd: number | string;
      emissionKgPerKm: number | string;
      forPlanner: boolean;
      forCarbon: boolean;
    }
  >;
}) {
  const copy = useAdminFormCopy();
  const { locale } = useI18n();

  return (
    <div className="space-y-6">
      <details className="rounded-[1.35rem] border border-forest/10 bg-white p-5" open>
        <summary className="cursor-pointer font-display text-xl">{copy.createNew}</summary>
        <form action={upsertTransport} className="mt-5 grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={copy.priceDzd}>
              <input name="priceDzd" type="number" defaultValue={0} className={inputClassName} />
            </Field>
            <Field label={copy.kgPerKm}>
              <input
                name="emissionKgPerKm"
                type="number"
                step="0.0001"
                defaultValue={0}
                className={inputClassName}
              />
            </Field>
          </div>
          <LocalizedTextFields prefix="name" label={copy.name} required />
          <LocalizedTextFields
            prefix="description"
            label={copy.shortDescription}
            multiline
            rows={3}
            required
          />
          <div className="flex flex-wrap gap-2">
            <ToggleField name="forPlanner" label={copy.forPlanner} defaultChecked />
            <ToggleField name="forCarbon" label={copy.forCarbon} defaultChecked />
            <ToggleField name="active" label={copy.active} defaultChecked />
          </div>
          <SubmitButton>{copy.create}</SubmitButton>
        </form>
      </details>
      {items.map((item) => (
        <article key={item.id} className="rounded-[1.35rem] border border-forest/10 bg-white p-5">
          <h3 className="mb-4 font-display text-2xl">
            {pickLocalized(item.name as never, locale)}
          </h3>
          <form action={upsertTransport} className="grid gap-4">
            <input type="hidden" name="id" value={item.id} />
            <input type="hidden" name="code" value={item.code} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={copy.priceDzd}>
                <input
                  name="priceDzd"
                  type="number"
                  defaultValue={Number(item.priceDzd)}
                  className={inputClassName}
                />
              </Field>
              <Field label={copy.kgPerKm}>
                <input
                  name="emissionKgPerKm"
                  type="number"
                  step="0.0001"
                  defaultValue={Number(item.emissionKgPerKm)}
                  className={inputClassName}
                />
              </Field>
            </div>
            <LocalizedTextFields
              prefix="name"
              label={copy.name}
              values={localizedValue(item.name)}
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
            <div className="flex flex-wrap gap-2">
              <ToggleField name="forPlanner" label={copy.forPlanner} defaultChecked={item.forPlanner} />
              <ToggleField name="forCarbon" label={copy.forCarbon} defaultChecked={item.forCarbon} />
              <ToggleField name="active" label={copy.active} defaultChecked={item.active} />
            </div>
            <SubmitButton>{copy.save}</SubmitButton>
          </form>
          <div className="mt-4">
            <DeleteButton
              action={deleteTransport}
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

export function EmissionFactorAdmin({
  items,
}: {
  items: Array<
    SharedItem & {
      kgPerKm: number | string;
      sortOrder: number;
    }
  >;
}) {
  const copy = useAdminFormCopy();
  const { locale } = useI18n();

  return (
    <div className="space-y-6">
      <details className="rounded-[1.35rem] border border-forest/10 bg-white p-5" open>
        <summary className="cursor-pointer font-display text-xl">{copy.createNew}</summary>
        <form action={upsertEmissionFactor} className="mt-5 grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={copy.kgPerKm}>
              <input name="kgPerKm" type="number" step="0.0001" defaultValue={0} className={inputClassName} />
            </Field>
            <Field label={copy.displayOrder}>
              <input name="sortOrder" type="number" defaultValue={0} className={inputClassName} />
            </Field>
          </div>
          <LocalizedTextFields prefix="name" label={copy.name} required />
          <LocalizedTextFields
            prefix="description"
            label={copy.shortDescription}
            multiline
            rows={3}
            required
          />
          <ToggleField name="active" label={copy.active} defaultChecked />
          <SubmitButton>{copy.create}</SubmitButton>
        </form>
      </details>
      {items.map((item) => (
        <article key={item.id} className="rounded-[1.35rem] border border-forest/10 bg-white p-5">
          <h3 className="mb-4 font-display text-2xl">
            {pickLocalized(item.name as never, locale)}
          </h3>
          <form action={upsertEmissionFactor} className="grid gap-4">
            <input type="hidden" name="id" value={item.id} />
            <input type="hidden" name="code" value={item.code} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={copy.kgPerKm}>
                <input
                  name="kgPerKm"
                  type="number"
                  step="0.0001"
                  defaultValue={Number(item.kgPerKm)}
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
            <LocalizedTextFields
              prefix="name"
              label={copy.name}
              values={localizedValue(item.name)}
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
            <ToggleField name="active" label={copy.active} defaultChecked={item.active} />
            <SubmitButton>{copy.save}</SubmitButton>
          </form>
          <div className="mt-4">
            <DeleteButton
              action={deleteEmissionFactor}
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
