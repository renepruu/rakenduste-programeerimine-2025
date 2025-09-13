import React from "react"

const ProfileCard: React.FC = () => {
  return (
    <section
      id="profile-card"
      className="profile-card"
    >
      <div
        className="profile-card__content"
        role="region"
        aria-labelledby="profile-card-title"
      >
        <h1 id="profile-card-title">Rene Pruul</h1>

        <div className="profile-card__section">
          <h2>Huvid / Hobid</h2>
          <ul>
            <li>Programmeerimine</li>
            <li>Ronimine</li>
            <li>Jooksmine</li>
          </ul>
        </div>

        <div className="profile-card__section">
          <h2>Kontakt</h2>
          <form
            className="profile-card__form"
            onSubmit={e => e.preventDefault()}
          >
            <label htmlFor="email">E-mail</label>
            <h3>rene.pruul2@gmail.com</h3>

            <label htmlFor="message">Kirjuta mulle</label>
            <div></div>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Kirjuta siia..."
            ></textarea>

            <button
              type="submit"
              className="profile-card__cta"
            >
              Saada sõnum
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ProfileCard
