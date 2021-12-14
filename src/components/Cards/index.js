import React, { useState } from 'react'
import styles from './styles.module.scss'

const Cards = ({ data }) => {
  const [filteredData, setFilteredData] = useState(data)
  const [userInfo, setUserInfo] = useState()
  const [userId, setUserId] = useState()
  const [userName, setUserName] = useState({ passingTags: {} })

  function userInfoClick(record, id, name) {
    setUserInfo(record)
    setUserId(id)
    setUserName(name)
  }

  // This function collects ALL keys that have true as a value, then create a new obj to compare to filter.
  function allFilterClick(val, filterProp) {
    let final
    if (val === 'gender') {
      final = filteredData.filter((item) => item[val] == filterProp)
    } else if (val === 'skillSet') {
      final = filteredData.filter((item) =>
        item['skillSet'].find((rec) => rec.label == filterProp)
      )
    }
    setFilteredData(final)
  }

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.dashBoard}>
          <p>GENDER </p>
          <button onClick={() => allFilterClick('gender', 'male')}>Male</button>
          <button onClick={() => allFilterClick('gender', 'female')}>
            Female
          </button>
          <div>
            <p>SKILL SET</p>
            <button onClick={() => allFilterClick('skillSet', 'Photography')}>
              Photography
            </button>
            <button
              onClick={() => allFilterClick('skillSet', 'Video Creation')}
            >
              Video
            </button>
            <button onClick={() => allFilterClick('skillSet', 'Social Posts')}>
              Social
            </button>
            <button onClick={() => allFilterClick('skillSet', 'Paid Ads')}>
              Paid Ads
            </button>
            <button
              onClick={() => allFilterClick('skillSet', 'Unboxing Products')}
            >
              Unboxing Products
            </button>
          </div>
          <p>EXPERIENCE</p>
          <button
            onClick={() => allFilterClick('previousPaidExperience', 'video')}
          >
            Video
          </button>
          <button
            onClick={() =>
              allFilterClick('previousPaidExperience', 'socialPost')
            }
          >
            Social Post
          </button>
          <button
            onClick={() =>
              allFilterClick('previousPaidExperience', 'photography')
            }
          >
            Photography
          </button>
        </div>
      </div>
      {filteredData &&
        filteredData.map((record) => (
          <>
            <div key={record._id} className={styles.card}>
              <img src={record.imageUrl} />
              <div>
                <h3>
                  <span id={styles.name}>
                    {record.firstName} {record.lastName}
                  </span>
                  <span id={styles.email}> ◎ {record.email} ◎ </span>
                  <span id={styles.phone}>{record.phone}</span>
                </h3>
                <p className={styles.about}>"{record.about}"</p>
                <div className={styles.userInfo}>
                  {/* PREVIOUS EXPERIENCE */}
                  <div className={styles.userIcons}>
                    {record.previousPaidExperience.photography && (
                      <div title="Photography">📷</div>
                    )}
                    {record.previousPaidExperience.socialPost && (
                      <div title="Social Post">🗣</div>
                    )}
                    {record.previousPaidExperience.video && (
                      <div title="Video">📹</div>
                    )}
                  </div>
                  <button
                    onClick={() =>
                      userInfoClick(record.skillSet, record._id, 'skills')
                    }
                  >
                    Skills
                  </button>

                  <button
                    onClick={() =>
                      userInfoClick(record.tags, record._id, 'tags')
                    }
                  >
                    Tags:
                  </button>
                  <div className={styles.subInfoContainer}>
                    {/* SKILLs */}
                    {record._id === userId &&
                      userName === 'skills' &&
                      userInfo.map((item) => (
                        <p key={userId + 1} className={styles.subInfoSkills}>
                          {item.label} → {item.yearsOfExperience}{' '}
                          {item.yearsOfExperience === 1
                            ? 'yr'
                            : item.yearsOfExperience === 0
                            ? null
                            : 'yrs'}
                        </p>
                      ))}

                    {/* TAGS */}
                    {record._id === userId &&
                      userName === 'tags' &&
                      userInfo.map((item) => (
                        <span className={styles.subInfoTags}>#{item}</span>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
    </div>
  )
}

export default Cards
