import { Inject, Injectable, Optional } from "@angular/core";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import moment from "moment-timezone";

@Injectable()
export class CustomMomentDateAdapter extends MomentDateAdapter {
    constructor(@Optional() @Inject(MAT_DATE_LOCALE) dateLocale: string) {
        super(dateLocale);
    }

    static TIMEZONE = "America/Dawson";
    static FORMAT = "MM-DD-YYYY"

    createDate(year: number, month: number, date: number): moment.Moment {
        if (month < 0 || month > 11) {
            throw Error(
                `Invalid month index "${month}". Month index has to be between 0 and 11.`
            );
        }

        if (date < 1) {
            throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
        }

        const monthString = ("0" + (month + 1)).slice(-2);
        const yearSting = ("0" + date).slice(-2);
        const dateString = `${year}-${monthString}-${yearSting} 00:00`;
        const result = moment.tz(dateString, CustomMomentDateAdapter.TIMEZONE);

        // If the result isn't valid, the date must have been out of bounds for this month.
        if (!result.isValid()) {
            throw Error(`Invalid date "${date}" for month with index "${month}".`);
        }

        return result;
    }


    format(date: moment.Moment, displayFormat: string): string {
        debugger;
        date = this.clone(date);
        if (!this.isValid(date)) {
            throw Error('MomentDateAdapter: Cannot format invalid date.');
        }
        return date.tz(CustomMomentDateAdapter.TIMEZONE).format(CustomMomentDateAdapter.FORMAT ? CustomMomentDateAdapter.FORMAT : displayFormat);
    }

    /**
     * Returns the given value if given a valid Moment or null. Deserializes valid ISO 8601 strings
     * (https://www.ietf.org/rfc/rfc3339.txt) and valid Date objects into valid Moments and empty
     * string into null. Returns an invalid date for all other values.
     */
    deserialize(value: any): moment.Moment | null {
        let date;
        if (value instanceof Date) {
            date = this._createMoment2(value).locale(this.locale);
        } else if (this.isDateInstance(value)) {
            // Note: assumes that cloning also sets the correct locale.
            return this.clone(value);
        }
        if (typeof value === "string") {
            if (!value) {
                return null;
            }
            date = this._createMoment2(value, moment.ISO_8601).locale(this.locale);
        }
        if (date && this.isValid(date)) {
            return this._createMoment2(date).locale(this.locale);
        }
        return super.deserialize(value);
    }

    parse(value: any, parseFormat: string | string[]): moment.Moment | null {
        if (value && typeof value === "string") {
            return this._createMoment2(value, parseFormat, this.locale);
        }
        return value ? this._createMoment2(value).locale(this.locale) : null;
    }

    today(): moment.Moment {
        return moment()
            .utc()
            .tz(CustomMomentDateAdapter.TIMEZONE)
            .local(this.locale);
    }

    /** Creates a Moment instance while respecting the current UTC settings. */
    private _createMoment2(
        date: moment.MomentInput,
        format?: moment.MomentFormatSpecification,
        locale?: string
    ): moment.Moment {
        debugger;
        return moment(date, format, locale).tz(CustomMomentDateAdapter.TIMEZONE);
        // const date2 = moment(date, format, locale).format("YYYY-MM-DD");
        // return moment.tz(date2, CustomMomentDateAdapter.TIMEZONE);
    }
}
