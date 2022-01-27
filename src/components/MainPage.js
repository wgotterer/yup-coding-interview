import React, {useEffect, useState} from 'react'
import { Grid} from '@mui/material'
import heart from '../svg/heartsvg.svg'
import idea from '../svg/idea.svg'
import laughing from '../svg/laughing.svg'
import GridItem from './GridItem';

 function MainPage() {

    const [postInfo, setPostInfo] = useState()
    const [popularityVote, setPopularityVote] = useState()
    const [funnyVote, setFunnyVote] = useState()
    const [smartVote, setSmartVote] = useState()
 
    useEffect(() => {
        fetch(" https://api.yup.io/posts/post/12294")
        .then(r => r.json())
        .then((profileData) => {
            setPostInfo(profileData)
                setPopularityVote(profileData["catVotes"]["popularity"]["up"] - profileData["catVotes"]["popularity"]["down"] )
                setFunnyVote(profileData["catVotes"]["funny"]["up"] - profileData["catVotes"]["funny"]["down"])
                setSmartVote(profileData["catVotes"]["intelligence"]["up"] - profileData["catVotes"]["intelligence"]["down"])
        })   
    }, [])
  
    const levelColors = {
        first: '#00E4FF',
        second: '#00FFA6',
        third: '#3EFF00',
        fourth: '#FFFB00',
        fifth: '#FFAE00',
        sixth: '#FF6100'
      }

    return postInfo && postInfo["weights"] ? (
            <div className="main-page-container">
                <h1>YUP</h1>
                <img src={postInfo.previewData.img} height="500px" width="500px"  />
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <GridItem 
                            title={"Favorite"}
                            emoji={heart}
                            voteNumber={popularityVote}
                            setVoteNumber={setPopularityVote}
                            score={postInfo["weights"]["popularity"]}
                            sextileColor={levelColors[postInfo["sextiles"]["popularity"]]}
                            
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <GridItem 
                            title={"Smart"}
                            emoji={idea}
                            voteNumber={smartVote}
                            setVoteNumber={setSmartVote}
                            score={postInfo["weights"]["intelligence"]}
                            sextileColor={levelColors[postInfo["sextiles"]["intelligence"]]}
                        />  
                    </Grid>

                    <Grid item xs={4}>
                        <GridItem 
                            title={"Funny"}
                            emoji={laughing}
                            voteNumber={funnyVote}
                            setVoteNumber={setFunnyVote}
                            score={Math.floor(postInfo["weights"]["funny"])}
                            sextileColor={levelColors[postInfo["sextiles"]["funny"]]}
                        /> 
                    </Grid>
                </Grid>
        </div>
    ) : null
}
export default MainPage


