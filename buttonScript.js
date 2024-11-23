
var currentButton = "";
function SetCurrentButtonId(nextButton) {
  if (currentButton != "")
    document.getElementById(currentButton).classList.remove('disabled');
  document.getElementById(nextButton).classList.add('disabled');
  currentButton = nextButton;
}

function ShowStates() {
  document.getElementById("contentHeader").innerHTML = "<h1 class=\"text-center font-weight-bold\">Character States</h1>";
  document.getElementById("content").innerHTML = "<table class=\"table-responsive-md table table-striped table-success\">  <thead>    <tr>      <th scope=\"col\" colspan=\"3\">        <h3 class=\"text-center\">Positive Character States</h3>      </th>    </tr>  </thead>  <thead>    <tr>      <th scope=\"col\">Icon</th>      <th scope=\"col\">State Name</th>      <th scope=\"col\">Description</th>    </tr>  </thead>  <tbody>    <tr>      <td><img src=\"states/hyper.png\" class=\"img-fluid\"></td>      <td>Hyper State</td>      <td>        <p>Attack of Characters in this state x 2 additionally.</p>        <p>Characters in this state will not be affected by Fatigue State, Hypnosis State, Windswept State, Paralyzed State, and Silenced State.</p>      </td>    </tr>    <tr>      <td><img src=\"states/frenzy.png\" class=\"img-fluid\"></td>      <td>Frenzied State</td>      <td>Attack of Characters in this state x 2 additionally.</td>    </tr>    <tr>      <td><img src=\"states/fervent.png\" class=\"img-fluid\"></td>      <td>Fervent State</td>      <td>        <p>Damage of Characters in this state will be dealt regardless of \"Runestone Number Shield (First Batch)\".</p>        <p>Damage of Characters in this state will be dealt regardless of \"Damage-reducing Resistance\".</p>      </td>    </tr>    <tr>      <td><img src=\"states/blessed.png\" class=\"img-fluid\"></td>      <td>Blessed State</td>      <td>Combo count +5 for each Characters in this state.</td>    </tr>    <tr>      <td><img src=\"states/tempest.png\" class=\"img-fluid\"></td>      <td>Tempestuous State</td>      <td>Attack of Characters in this state x 5 additionally.</td>    </tr>    <tr>      <td><img src=\"states/tao.png\" class=\"img-fluid\"></td>      <td>Tao State</td>      <td>        <p>Attack of Characters in this state x 1.5 additionally.</p>        <p>Characters in this state launch 2 extra attacks of their original Attribute as much as 50% of their Attack.</p>        <p>Damage of Characters in this state will be dealt regardless of Human, Elf, and God enemies' Defense.</p>      </td>    </tr>  </tbody></table><table class=\"table-responsive-md table table-striped table-danger\">  <thead>    <tr>      <th scope=\"col\" colspan=\"3\">        <h3 class=\"text-center\">Negative Character States</h3>      </th>    </tr>  </thead>  <thead>    <tr>      <th scope=\"col\">Icon</th>      <th scope=\"col\">State Name</th>      <th scope=\"col\">Description</th>    </tr>  </thead>  <tbody>    <tr>      <td><img src=\"states/fatigue.png\" class=\"img-fluid\"></td>      <td>Fatigue State</td>      <td>        <p>Attack of Characters in this state is greatly reduced.</p>        <p>Characters in this state will not be affected by Hypnosis State, Windswept State, Paralyzed State, and Silenced State.</p>        <p>Characters in this state will not launch any attacks if their Attack is 0.</p>      </td>    </tr>    <tr>      <td><img src=\"states/hypnosis.png\" class=\"img-fluid\"></td>      <td>Hypnosis State</td>      <td>        <p>Characters in this state cannot launch any attacks.</p>        <p>Characters in this state cannot activate their Active Skill.</p>      </td>    </tr>    <tr>      <td><img src=\"states/windswept.png\" class=\"img-fluid\"></td>      <td>Windswept State</td>      <td>        <p>Characters in this state cannot launch any attacks.</p>        <p>Characters in this state cannot activate their Active Skill.</p>        <p>Characters in this state cannot trigger their Character Runestone.</p>      </td>    </tr>    <tr>      <td><img src=\"states/paralyze.png\" class=\"img-fluid\"></td>      <td>Paralyzed State</td>      <td>        <p>Characters in this state cannot launch any attacks.</p>        <p>CD of Characters in this state cannot be reduced by any means (including the Boss Skill \"CD Restore\").</p>        <p>EP of Characters in this state cannot be restored by any means (including the Boss Skill \"EP Restore\").</p>      </td>    </tr>    <tr>      <td><img src=\"states/silent.png\" class=\"img-fluid\"></td>      <td>Silenced State</td>      <td>        <p>Characters in this state cannot activate their Active Skill.</p>        <p>Dragonic Compulsion cannot be activated while there is a Character in this state.</p>      </td>    </tr>    <tr>      <td><img src=\"states/lock1.png\" class=\"img-fluid\"></td>      <td>Skill Lock</td>      <td>        <p>Characters in this state cannot activate their Active Skill.</p>        <p>This state cannot be cleared by \"Clear Additional Effect(s)\" skills.</p>      </td>    </tr>    <tr>      <td><img src=\"states/lock2.png\" class=\"img-fluid\"></td>      <td>Skill & Attack Lock</td>      <td>        <p>Characters in this state cannot launch any attacks.</p>        <p>Characters in this state cannot activate their Active Skill.</p>        <p>This state cannot be cleared by \"Clear Additional Effect(s)\" skills.</p>      </td>    </tr>    <tr>      <td><img src=\"states/dizzy.png\" class=\"img-fluid\"></td>      <td>Dizzy State</td>      <td>        <p><b>This state is caused by the Wave Skill \"Rocky Areas\".</b></p>        <p>Characters in this state cannot launch any attacks.</p>        <p>Characters in this state cannot activate their Active Skill.</p>        <p>Characters in this state cannot trigger their Character Runestone.</p>      </td>    </tr>    <tr>      <td><img src=\"states/dotty.png\" class=\"img-fluid\"></td>      <td>Dotty State</td>      <td>        <p><b>This state is caused by the Wave Skill \"Icon-changing Areas\".</b></p>        <p>Characters in this state cannot activate their Active Skill.</p>        <p>This state cannot be cleared by \"Clear Additional Effect(s)\" skills.</p>      </td>    </tr>    <tr>      <td><img src=\"states/deadly.png\" class=\"img-fluid\"></td>      <td>Deadly Dormancy</td>      <td>        <p>Characters in this state cannot launch any attacks.</p>        <p>Characters in this state cannot activate their Active Skill.</p>        <p>Characters in this state cannot trigger their Character Runestone.</p>        <p>Characters in this state cannot be equipped with the Chronon Meter.</p>        <p>This state cannot be cleared by \"Clear Additional Effect(s)\" skills.</p>      </td>    </tr>  </tbody></table>";
  SetCurrentButtonId("stateButton");
}

function ShowChronons() {
  document.getElementById("contentHeader").innerHTML = "<h1 class=\"text-center font-weight-bold\">Chronon Cards</h1>";
  document.getElementById("content").innerHTML = "<table class=\"table-responsive-md table table-primary\">  <thead>    <tr>      <th scope=\"col\">Tier</th>      <th scope=\"col\">Cards</th>    </tr>  </thead>  <tbody>    <tr>      <td>3</td>      <td>        <a onclick=\"FillChrononModal(9); return false;\" data-toggle=\"modal\" href=\"#chrononModal\">          <img src=\"chronons/1_10.png\" class=\"img-fluid custom-icon-size-1\">        </a>        <a onclick=\"FillChrononModal(15); return false;\" data-toggle=\"modal\" href=\"#chrononModal\">          <img src=\"chronons/1_16.png\" class=\"img-fluid custom-icon-size-1\">        </a>        <a onclick=\"FillChrononModal(19); return false;\" data-toggle=\"modal\" href=\"#chrononModal\">          <img src=\"chronons/1_20.png\" class=\"img-fluid custom-icon-size-1\">        </a>        <a onclick=\"FillChrononModal(25); return false;\" data-toggle=\"modal\" href=\"#chrononModal\">          <img src=\"chronons/1_26.png\" class=\"img-fluid custom-icon-size-1\">        </a>        <a onclick=\"FillChrononModal(31); return false;\" data-toggle=\"modal\" href=\"#chrononModal\">          <img src=\"chronons/1_32.png\" class=\"img-fluid custom-icon-size-1\">        </a>      </td>    </tr>      <td>2</td>      <td>        <a onclick=\"FillChrononModal(4); return false;\" data-toggle=\"modal\" href=\"#chrononModal\">          <img src=\"chronons/1_05.png\" class=\"img-fluid custom-icon-size-1\">        </a>        <a onclick=\"FillChrononModal(5); return false;\" data-toggle=\"modal\" href=\"#chrononModal\">          <img src=\"chronons/1_06.png\" class=\"img-fluid custom-icon-size-1\">        </a>        <a onclick=\"FillChrononModal(6); return false;\" data-toggle=\"modal\" href=\"#chrononModal\">          <img src=\"chronons/1_07.png\" class=\"img-fluid custom-icon-size-1\">        </a>        <a onclick=\"FillChrononModal(7); return false;\" data-toggle=\"modal\" href=\"#chrononModal\">          <img src=\"chronons/1_08.png\" class=\"img-fluid custom-icon-size-1\">        </a>        <a onclick=\"FillChrononModal(8); return false;\" data-toggle=\"modal\" href=\"#chrononModal\">          <img src=\"chronons/1_09.png\" class=\"img-fluid custom-icon-size-1\">        </a>        <a onclick=\"FillChrononModal(13); return false;\" data-toggle=\"modal\" href=\"#chrononModal\">          <img src=\"chronons/1_14.png\" class=\"img-fluid custom-icon-size-1\">        </a>        <a onclick=\"FillChrononModal(14); return false;\" data-toggle=\"modal\" href=\"#chrononModal\">          <img src=\"chronons/1_15.png\" class=\"img-fluid custom-icon-size-1\">        </a>        <a onclick=\"FillChrononModal(16); return false;\" data-toggle=\"modal\" href=\"#chrononModal\">          <img src=\"chronons/1_17.png\" class=\"img-fluid custom-icon-size-1\">        </a>        <a onclick=\"FillChrononModal(17); return false;\" data-toggle=\"modal\" href=\"#chrononModal\">          <img src=\"chronons/1_18.png\" class=\"img-fluid custom-icon-size-1\">        </a>        <a onclick=\"FillChrononModal(23); return false;\" data-toggle=\"modal\" href=\"#chrononModal\">          <img src=\"chronons/1_24.png\" class=\"img-fluid custom-icon-size-1\">        </a>        <a onclick=\"FillChrononModal(24); return false;\" data-toggle=\"modal\" href=\"#chrononModal\">          <img src=\"chronons/1_25.png\" class=\"img-fluid custom-icon-size-1\">        </a>        <a onclick=\"FillChrononModal(27); return false;\" data-toggle=\"modal\" href=\"#chrononModal\">          <img src=\"chronons/1_28.png\" class=\"img-fluid custom-icon-size-1\">        </a>        <a onclick=\"FillChrononModal(28); return false;\" data-toggle=\"modal\" href=\"#chrononModal\">          <img src=\"chronons/1_29.png\" class=\"img-fluid custom-icon-size-1\">        </a>        <a onclick=\"FillChrononModal(30); return false;\" data-toggle=\"modal\" href=\"#chrononModal\">          <img src=\"chronons/1_31.png\" class=\"img-fluid custom-icon-size-1\">        </a>      </td>    </tr>      <td>1</td>      <td>        <a onclick=\"FillChrononModal(0); return false;\" data-toggle=\"modal\" href=\"#chrononModal\">          <img src=\"chronons/1_01.png\" class=\"img-fluid custom-icon-size-1\">        </a>        <a onclick=\"FillChrononModal(1); return false;\" data-toggle=\"modal\" href=\"#chrononModal\">          <img src=\"chronons/1_02.png\" class=\"img-fluid custom-icon-size-1\">        </a>        <a onclick=\"FillChrononModal(2); return false;\" data-toggle=\"modal\" href=\"#chrononModal\">          <img src=\"chronons/1_03.png\" class=\"img-fluid custom-icon-size-1\">        </a>        <a onclick=\"FillChrononModal(3); return false;\" data-toggle=\"modal\" href=\"#chrononModal\">          <img src=\"chronons/1_04.png\" class=\"img-fluid custom-icon-size-1\">        </a>        <a onclick=\"FillChrononModal(10); return false;\" data-toggle=\"modal\" href=\"#chrononModal\">          <img src=\"chronons/1_11.png\" class=\"img-fluid custom-icon-size-1\">        </a>        <a onclick=\"FillChrononModal(11); return false;\" data-toggle=\"modal\" href=\"#chrononModal\">          <img src=\"chronons/1_12.png\" class=\"img-fluid custom-icon-size-1\">        </a>        <a onclick=\"FillChrononModal(12); return false;\" data-toggle=\"modal\" href=\"#chrononModal\">          <img src=\"chronons/1_13.png\" class=\"img-fluid custom-icon-size-1\">        </a>        <a onclick=\"FillChrononModal(18); return false;\" data-toggle=\"modal\" href=\"#chrononModal\">          <img src=\"chronons/1_19.png\" class=\"img-fluid custom-icon-size-1\">        </a>        <a onclick=\"FillChrononModal(20); return false;\" data-toggle=\"modal\" href=\"#chrononModal\">          <img src=\"chronons/1_21.png\" class=\"img-fluid custom-icon-size-1\">        </a>        <a onclick=\"FillChrononModal(21); return false;\" data-toggle=\"modal\" href=\"#chrononModal\">          <img src=\"chronons/1_22.png\" class=\"img-fluid custom-icon-size-1\">        </a>        <a onclick=\"FillChrononModal(22); return false;\" data-toggle=\"modal\" href=\"#chrononModal\">          <img src=\"chronons/1_23.png\" class=\"img-fluid custom-icon-size-1\">        </a>        <a onclick=\"FillChrononModal(26); return false;\" data-toggle=\"modal\" href=\"#chrononModal\">          <img src=\"chronons/1_27.png\" class=\"img-fluid custom-icon-size-1\">        </a>        <a onclick=\"FillChrononModal(29); return false;\" data-toggle=\"modal\" href=\"#chrononModal\">          <img src=\"chronons/1_30.png\" class=\"img-fluid custom-icon-size-1\">        </a>      </td>    </tr>  </tbody></table>";
  SetCurrentButtonId("chrononButton");
}
