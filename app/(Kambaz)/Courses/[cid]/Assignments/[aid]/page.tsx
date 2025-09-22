export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">
        <b>Assignment Name</b>
      </label>
      <br />
      <br />
      <input id="wd-name" defaultValue="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea
        id="wd-description"
        defaultValue="The assignment is available online Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: Your full name and section Links to each of the lab assignments Link to the Kanbas application Links to all relevant source code repositories The Kanbas application should include a link to navigate back to the landing page."
        rows={10}
        cols={47}
      />
      <br />
      <br />
      <table>
        <tbody>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" defaultValue={100} />
            </td>
          </tr>
          <tr>
            <td colSpan={3}>&nbsp;</td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assignment-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-assignment-group" defaultValue={"ASSIGNMENTS"}>
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              </select>
            </td>
          </tr>
          <tr>
            <td colSpan={3}>&nbsp;</td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </td>
            <td>
              <select id="wd-display-grade-as" defaultValue={"Percentage"}>
                <option value="Percentage">Percentage</option>
                <option value="Grade Letter">Grade Letter</option>
              </select>
            </td>
          </tr>
          <tr>
            <td colSpan={3}>&nbsp;</td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select id="wd-submission-type" defaultValue={"Online"}>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
            </td>
          </tr>
          <tr>
            <td colSpan={3}>&nbsp;</td>
          </tr>
          <tr>
            <td></td>
            <td>
              <label>Online Entry Options</label>
              <br />
              <input
                type="checkbox"
                name="check-online-entry-option"
                id="wd-text-entry"
              />
              <label htmlFor="wd-text-entry">Text Entry</label>
              <br />
              <input
                type="checkbox"
                name="wd-website-url"
                id="wd-website-url"
              />
              <label htmlFor="wd-website-url">Website URL</label>
              <br />
              <input
                type="checkbox"
                name="check-online-entry-option"
                id="wd-media-recordings"
              />
              <label htmlFor="wd-media-recordings">Media Recordings</label>
              <br />
              <input
                type="checkbox"
                name="check-online-entry-option"
                id="wd-student-annotation"
              />
              <label htmlFor="wd-student-annotation">Student Annotation</label>
              <br />
              <input
                type="checkbox"
                name="check-online-entry-option"
                id="wd-file-upload"
              />
              <label htmlFor="wd-file-upload">File Upload</label>{" "}
            </td>
          </tr>
          <tr>
            <td colSpan={3}>&nbsp;</td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assign">Assign</label>
            </td>
            <td>
              Assign to
              <br />
              <input type="text" defaultValue="Everyone" />
            </td>
          </tr>
          <tr>
            <td colSpan={3}>&nbsp;</td>
          </tr>
          <tr>
            <td></td>
            <td>
              Due <br />
              <input type="date" defaultValue="2024-05-13" />{" "}
            </td>
          </tr>
          <tr>
            <td colSpan={3}>&nbsp;</td>
          </tr>
          <tr>
            <td></td>
            <td>
              <label htmlFor="wd-available-from">Available from</label>
            </td>
            <td>
              <label htmlFor="wd-available-until">Until</label>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <input
                type="date"
                id="wd-available-from"
                defaultValue="2024-05-06"
              />
            </td>
            <td>
              <input
                type="date"
                id="wd-available-until"
                defaultValue="2024-05-20"
              />
            </td>
          </tr>
          <tr>
            <td colSpan={3}>
              <hr />
            </td>
          </tr>

          <tr>
            <td></td>
            <td></td>
            <td align="right" valign="top">
              <button id="wd-cancel-assignment">Cancel</button>{" "}
              <button id="wd-save-assignment">Save</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
