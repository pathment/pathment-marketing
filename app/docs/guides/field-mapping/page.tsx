import Link from "next/link";
import { DocsPage } from "../../../../components/docs/DocsPage";
import { CodeBlock } from "../../../../components/docs/CodeBlock";
import { Callout } from "../../../../components/docs/Callout";
import { H2, H3, Step, Steps, Table } from "../../../../components/docs/Prose";
import { ParamTable } from "../../../../components/docs/ParamTable";
import { docsMetadata } from "../../../../lib/docs/metadata";
import { mappingExample, pushWithConnectionSamples } from "../../../../lib/docs/examples";

const HREF = "/docs/guides/field-mapping";
export const metadata = docsMetadata(HREF);

const c = (text: string) => <code key={text}>{text}</code>;

export default function FieldMappingPage() {
  return (
    <DocsPage href={HREF}>
      <H2 id="what-a-connection-is">What a connection is</H2>
      <p>
        Your system has its own names for things. Maybe it says <code>email_address</code>{" "}where Pathment
        says <code>email</code>, keeps the full name in one field, or calls levels &ldquo;Beginner&rdquo; and
        &ldquo;Advanced&rdquo;. You could reshape every record in code before sending it. A connection lets
        you skip that.
      </p>
      <p>
        A <strong>connection</strong>{" "}is a saved setup in Pathment for one source of people. It has:
      </p>
      <ul>
        <li>
          <strong>A name</strong>, like &ldquo;HubSpot contacts&rdquo;.
        </li>
        <li>
          <strong>A target intake</strong>, used as the default when you run syncs from the app.
        </li>
        <li>
          <strong>A field mapping</strong>: how to turn one of your records into a Pathment applicant.
        </li>
        <li>
          <strong>What happens after each sync</strong>: nothing, or{" "}
          <Link href="/docs/guides/sending-assessments">send the assessment</Link>{" "}to new applicants.
        </li>
      </ul>
      <p>
        Admins create connections in <strong>Settings → Integrations → Connections</strong>. The API
        refers to one by its ID. Send <code>&quot;connection&quot;: &quot;&lt;connection ID&gt;&quot;</code>{" "}with a push and
        Pathment applies that mapping to every record.
      </p>
      <Callout type="tip">
        <p>
          Because the mapping lives in Pathment, a programme admin can fix it (say, a new level name in
          your CRM) without anyone touching your integration code.
        </p>
      </Callout>

      <H2 id="pathment-fields">Pathment&apos;s applicant fields</H2>
      <p>These are the fields a mapping fills in. Without a connection, send them under these names.</p>
      <ParamTable
        params={[
          { name: "email", type: "string", required: true, description: "The person's email address. Every applicant needs one." },
          { name: "firstName", type: "string", description: "Given name." },
          { name: "lastName", type: "string", description: "Family name." },
          { name: "phone", type: "string", description: "Phone number, ideally with the country code." },
          {
            name: "level",
            type: "string",
            description: (
              <p>
                If the intake has levels, this must match one of them by key or label, ignoring case (so{" "}
                <code>senior</code>, <code>Senior</code>{" "}and <code>SENIOR</code>{" "}all match a level with the key{" "}
                <code>senior</code>, and is stored as that key), or the record fails with <code>invalid_level</code>. If the intake has no
                levels, the value is stored as <code>responses.level</code>{" "}instead. It
                decides which assessment the person gets.
              </p>
            ),
          },
          { name: "country", type: "string", description: "Where the person is based." },
          {
            name: "externalId",
            type: "string",
            description: (
              <p>
                Your ID for this person. Strongly recommended: it&apos;s how later syncs find the same person.
              </p>
            ),
          },
          {
            name: "responses",
            type: "object",
            description: "Any extra answers or details. Reviewers see these on the applicant.",
          },
        ]}
      />

      <H2 id="mapping-rules">Mapping rules</H2>
      <p>
        A mapping is one rule per Pathment field. Here is a complete one, which you&apos;ll see in action in
        the worked examples below:
      </p>
      <CodeBlock code={mappingExample} language="json" title="Field mapping" />
      <p>Each rule can have up to four parts:</p>
      <ParamTable
        params={[
          {
            name: "from",
            type: "string",
            required: true,
            description: "Where to read the value in your record. Supports nested paths.",
          },
          {
            name: "transform",
            type: "string",
            description: "How to clean or reshape the value. One of the transforms listed below.",
          },
          {
            name: "map",
            type: "object",
            description: "Translates your values into Pathment's, for example \"Advanced\" to \"senior\".",
          },
          {
            name: "default",
            type: "string",
            description: (
              <p>
                Used when there&apos;s a <code>map</code>{" "}and your value isn&apos;t in it.
              </p>
            ),
          },
        ]}
      />

      <H3 id="paths">Reading nested values</H3>
      <p>
        <code>from</code>{" "}takes a path. Use dots to step into objects and square brackets to pick from a
        list:
      </p>
      <Table
        head={["Path", "Reads"]}
        rows={[
          [c("email"), "A top-level field called email."],
          [c("user.email_address"), "email_address inside the user object."],
          [c("contact.emails[0]"), "The first item of the emails list inside contact."],
          [c("answers[2].value"), "value from the third answer."],
        ]}
      />
      <p>If a path doesn&apos;t exist in a record, the field is simply left empty for that record.</p>

      <H3 id="transforms">Transforms</H3>
      <p>
        Whitespace is always trimmed from the start and end of every value. On top of that, pick at most
        one transform per rule:
      </p>
      <Table
        head={["Transform", "Does", "Example"]}
        rows={[
          [c("trim"), "Removes leading and trailing spaces. Always applied.", <>&ldquo; Ada &rdquo; → &ldquo;Ada&rdquo;</>],
          [c("lowercase"), "Makes every letter lower case.", <>&ldquo;Ada@Example.com&rdquo; → &ldquo;ada@example.com&rdquo;</>],
          [c("uppercase"), "Makes every letter upper case.", <>&ldquo;gb&rdquo; → &ldquo;GB&rdquo;</>],
          [c("titlecase"), "Capitalises the first letter of each word.", <>&ldquo;ada okafor&rdquo; → &ldquo;Ada Okafor&rdquo;</>],
          [c("first_name"), "The first word of a full name.", <>&ldquo;Ada Ngozi Okafor&rdquo; → &ldquo;Ada&rdquo;</>],
          [c("last_name"), "Everything after the first word.", <>&ldquo;Ada Ngozi Okafor&rdquo; → &ldquo;Ngozi Okafor&rdquo;</>],
          [c("digits"), "Keeps only digits, and a leading +.", <>&ldquo;+44 (7700) 900-123&rdquo; → &ldquo;+447700900123&rdquo;</>],
          [c("date"), "Turns a date into ISO 8601.", <>&ldquo;2026-11-19T10:02:11Z&rdquo; → &ldquo;2026-11-19&rdquo;</>],
        ]}
      />

      <H3 id="value-maps">Value maps and defaults</H3>
      <p>
        <code>map</code>{" "}translates values. It&apos;s most useful for <code>level</code>, where your words
        rarely match the intake&apos;s levels:
      </p>
      <CodeBlock
        language="json"
        title="Level rule"
        code={`"level": {
  "from": "track",
  "map": { "Beginner": "beginner", "Intermediate": "beginner", "Advanced": "senior" },
  "default": "beginner"
}`}
      />
      <p>For each record, Pathment works out the value in this order:</p>
      <ol>
        <li>
          If your value is in <code>map</code>, it&apos;s translated. <code>&quot;Advanced&quot;</code>{" "}becomes{" "}
          <code>senior</code>.
        </li>
        <li>
          Otherwise, if the rule has a <code>default</code>, the default is used.{" "}
          <code>&quot;Expert&quot;</code>{" "}becomes <code>beginner</code>.
        </li>
        <li>Otherwise, your value is kept exactly as you sent it.</li>
      </ol>
      <p>Then, for <code>level</code>, Pathment checks the result against the intake:</p>
      <ul>
        <li>
          <strong>If the intake has levels</strong>, the value must match one of them by key or by label,
          ignoring case. <code>senior</code>, <code>Senior</code>{" "}and <code>SENIOR</code>{" "}all match a level
          with the key <code>senior</code>{" "}or the label &ldquo;Senior&rdquo;. A match is always stored as the
          level&apos;s key: send &ldquo;Senior&rdquo; and the applicant&apos;s <code>level</code>{" "}is{" "}
          <code>senior</code>. If it matches none, the record fails with <code>invalid_level</code>.
        </li>
        <li>
          <strong>If the intake has no levels</strong>, the value isn&apos;t checked. It&apos;s stored under{" "}
          <code>responses.level</code>{" "}instead.
        </li>
      </ul>
      <p>
        Leaving out <code>default</code>{" "}is often what you want: when a new value appears in your system,
        you see <code>invalid_level</code>{" "}errors instead of people quietly landing on the wrong level.
      </p>

      <H3 id="keep-unmapped">Keeping everything else</H3>
      <p>
        <code>keepUnmapped</code>{" "}is on unless you turn it off. Every field you didn&apos;t map is stored on
        the applicant under <code>responses</code>, so reviewers still see things like a portfolio link or
        a motivation statement. Turn it off if your records carry internal data that reviewers
        shouldn&apos;t see.
      </p>

      <H2 id="setting-up">Setting one up in the app</H2>
      <Steps>
        <Step title="Create the connection">
          <p>
            Go to <strong>Settings → Integrations → Connections</strong>, create one and choose its
            target intake.
          </p>
        </Step>
        <Step title="Paste a sample record">
          <p>
            Paste one real record from your system as JSON. Pathment suggests a mapping by recognising
            common names, such as <code>email_address</code>{" "}for email, <code>mobile</code>{" "}for phone, or{" "}
            <code>full_name</code>{" "}for first and last name.
          </p>
        </Step>
        <Step title="Adjust and preview">
          <p>
            Fix anything it guessed wrong and add value maps. The preview shows five records as Pathment
            will store them, so you can check before saving.
          </p>
        </Step>
        <Step title="Save and copy the ID">
          <p>Save it, then copy the connection ID into your integration&apos;s config.</p>
        </Step>
      </Steps>

      <H2 id="worked-examples">Worked examples</H2>

      <H3 id="example-flat">A flat CRM export</H3>
      <p>Your CRM exports contacts like this:</p>
      <CodeBlock
        language="json"
        title="Your record"
        code={`{
  "id": 1042,
  "full_name": "  Ada Ngozi Okafor ",
  "user": { "email_address": "Ada.Okafor@Example.com" },
  "mobile": "+44 (7700) 900-123",
  "track": "Advanced",
  "portfolio": "https://example.com/ada"
}`}
      />
      <p>With the mapping at the top of this page, Pathment stores:</p>
      <CodeBlock
        language="json"
        title="What Pathment stores"
        code={`{
  "externalId": "1042",
  "email": "ada.okafor@example.com",
  "firstName": "Ada",
  "lastName": "Ngozi Okafor",
  "phone": "+447700900123",
  "level": "senior",
  "responses": {
    "portfolio": "https://example.com/ada"
  }
}`}
      />
      <p>
        The name was trimmed and split, the email lower-cased, the phone cleaned, &ldquo;Advanced&rdquo;
        became <code>senior</code>, and <code>portfolio</code>, which wasn&apos;t mapped, was kept under{" "}
        <code>responses</code>.
      </p>

      <H3 id="example-nested">A nested form response</H3>
      <p>Form tools often nest answers and allow several emails:</p>
      <CodeBlock
        language="json"
        title="Your record"
        code={`{
  "submission_id": "sub_88213",
  "contact": {
    "emails": ["bo@example.com", "bo.work@example.org"],
    "country_code": "se"
  },
  "name": { "given": "bo", "family": "lindqvist" },
  "experience": "Some"
}`}
      />
      <CodeBlock
        language="json"
        title="Field mapping"
        code={`{
  "fields": {
    "externalId": { "from": "submission_id" },
    "email":      { "from": "contact.emails[0]", "transform": "lowercase" },
    "firstName":  { "from": "name.given", "transform": "titlecase" },
    "lastName":   { "from": "name.family", "transform": "titlecase" },
    "country":    { "from": "contact.country_code", "transform": "uppercase" },
    "level":      { "from": "experience", "map": { "None": "beginner", "Some": "beginner", "Lots": "senior" } }
  },
  "keepUnmapped": false
}`}
      />
      <CodeBlock
        language="json"
        title="What Pathment stores"
        code={`{
  "externalId": "sub_88213",
  "email": "bo@example.com",
  "firstName": "Bo",
  "lastName": "Lindqvist",
  "country": "SE",
  "level": "beginner"
}`}
      />
      <p>
        With <code>keepUnmapped</code>{" "}off, the second email address is not stored.
      </p>

      <H2 id="using-it">Using a connection from the API</H2>
      <p>
        Add <code>connection</code>{" "}to the push body and send your records untouched. You can still
        override the connection&apos;s &ldquo;after each sync&rdquo; setting per request with{" "}
        <code>sendAssessment</code>.
      </p>
      <CodeBlock samples={pushWithConnectionSamples} title="Push with a connection" />
      <ul>
        <li>
          When you use a connection, <code>externalId</code>{" "}matching is scoped to that connection. Your
          CRM&apos;s ID 1042 and your form tool&apos;s ID 1042 are different people.
        </li>
        <li>
          If a rule can&apos;t be applied to a record, that record fails with <code>mapping_failed</code>{" "}and
          the rest carry on.
        </li>
        <li>
          Test a new or changed mapping with a <Link href="/docs/guides/dry-runs-and-reports">dry run</Link>{" "}
          first.
        </li>
      </ul>
    </DocsPage>
  );
}
