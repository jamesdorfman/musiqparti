
function LikeButton(props) {
    const handleClick = () => 
    {{props.changeIncrement();
     props.changeCounter(props.liked);}};
        return (
          <Button 
              onClick={handleClick}>
              {props.liked}
          </Button>
      );
}



// function LikeButton(props) {
//     const handleClick = () => 
//     {{props.changeIncrement();
//      props.changeCounter(props.liked);}};
//         return (
//           <Button 
//               icon="star"
//               onClick={handleClick}
//               bgGradient={props.color[{{props.liked}}]}>
//               {props.liked}
//           </Button>
//       );
// }
  
function DisplayLikes(props) {
      return (
          <div>{props.message}</div>
      );
}
  
  
function Likes(props) {
      const [counter, setCounter] = useState(100); // currently hardcoded find way to retrieve the user's likes
      const [increment, setIncrement] = useState(1);
      let key1 = 1;
      let key2 = -1;
      const buttonColor= ['linear(to-l, #7928CB, #FF0080)', 'linear(to-l, #7928CA, #FF0080)'];
      const toggleLike = () => setIncrement(-1 * increment);
      const incrementCounter = (incrementValue) => setCounter(counter+incrementValue);
      return(
          <div>
              <HStack>
                <LikeButton changeIncrement={toggleLike} changeCounter={incrementCounter} liked={increment} currentLikes={counter} color={buttonColor}/>
                <VStack>
                    <Box><DisplayLikes message={counter}/></Box>
                    <Box><h1>LIKES</h1></Box>
                </VStack>
              </HStack>
          </div>
      );
      
}